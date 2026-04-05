import express from 'express'
import authRoute from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'
import dotenv from 'dotenv'
import { connectDB } from './config/db.config.js'
import path from 'path'
import cookieParser from 'cookie-parser'
import { protectRoute } from './middlewares/auth.middleware.js'
import { updateProfile } from './controllers/auth.controller.js'
import { fileURLToPath } from 'url'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '.env') })

const PORT = process.env.PORT || 5001
//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


//routes
app.use("/api/auth", authRoute)
app.use ("/api/message", messageRoute)

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()
