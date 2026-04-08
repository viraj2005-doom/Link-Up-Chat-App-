import mongoose from 'mongoose';

export const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI

    if (!mongoUri) {
        throw new Error('MONGODB_URI is not set')
    }

    try {
        const conn = await mongoose.connect(mongoUri);
        console.log(`Connected to MongoDB: ${conn.connection.host}`)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        throw error
    }
}

