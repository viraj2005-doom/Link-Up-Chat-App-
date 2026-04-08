import express from 'express'
import authRoute from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'
import './config/env.js'
import { connectDB } from './config/db.config.js'
import path from 'path'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import cors from 'cors'
import { app, server } from './services/socket.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 5001
//middlewares
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))


//routes
app.use("/api/auth", authRoute)
app.use ("/api/message", messageRoute)

if (process.env.NODE_ENV==="production") {
    const frontendDistPath = path.join(__dirname, '../../frontend/dist')

    app.use(express.static(frontendDistPath))

    app.get('/{*splat}', (req, res) => {
        res.sendFile(path.join(frontendDistPath, 'index.html'))
    })
}
const startServer = async () => {
    try {
        await connectDB()
        server.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()
