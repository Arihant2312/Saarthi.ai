import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import aiRouter from './routes/aiRouter.js'; 
import userRouter from './routes/userRouter.js';  
import connectcloudinary from './configs/cloudinary.js';

const app = express();

await connectcloudinary();

// ✅ CORS config for frontend with credentials
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());
app.use(clerkMiddleware());

// Test route
app.get('/', (req, res) => {
  res.send("server is running");
});

// Protected routes
app.use('/api/ai', requireAuth(), aiRouter);
app.use('/api/user', requireAuth(), userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
