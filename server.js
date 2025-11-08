
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import snippetRoutes from './routes/snippets.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
const allowedOrigins = [process.env.CLIENT_URL || 'http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) => {
        // allow requests with no origin (like mobile apps or curl/postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
// Increase payload limits to support large snippets/base64 thumbnails
app.use(express.json({ limit: process.env.JSON_LIMIT || '10mb' }));
app.use(express.urlencoded({ extended: false, limit: process.env.URLENCODED_LIMIT || '10mb' }));

// API Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the React Snippet API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/snippets', snippetRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
