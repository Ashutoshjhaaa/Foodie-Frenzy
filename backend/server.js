import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import { connectDB } from './config/db.js';

import path from 'path'
import { fileURLToPath } from 'url';
import userRouter from './routes/userRoutes.js'
import itemRouter from './routes/itemRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoute.js'

const app = express();
const PORT = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

// Middleware
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:5173', 
            'http://localhost:5174',
            'https://foodie-frenzyy.vercel.app',
            process.env.FRONTEND_URL,
            process.env.ADMIN_URL
        ].filter(Boolean);
        
        // Check if origin matches exactly OR ends with a slash if not provided correctly
        if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes(origin.replace(/\/$/, ''))) {
            callback(null, true);
        }
        else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token']
})
)
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB()

// Routes
app.use('/api/user', userRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/items', itemRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)
 
app.get('/', (req, res) => {
  res.send('API Working!')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
