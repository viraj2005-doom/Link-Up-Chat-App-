import express from 'express'
import authRoute from './routes/auth.route.js'
import dotenv from 'dotenv'
import { connectDB } from './config/db.config.js'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '.env') })

const PORT = process.env.PORT || 5001
//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.use("/api/auth", authRoute)

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
