import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI || typeof process.env.MONGO_URI !== 'string' || process.env.MONGO_URI.trim() === '') {
            throw new Error('MONGO_URI is not set. Create a .env file with MONGO_URI=your_connection_string');
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
