import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware,requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRouter.js'; 
import userRouter from './routes/userRouter.js';  // Add this line to import user router
import connectcloudinary from './configs/cloudinary.js';
const app=express();

await connectcloudinary();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());


app.get('/',(req,res)=>{
    res.send("server is running")
})
app.use('/api/ai', requireAuth(), aiRouter);
app.use('/api/user', requireAuth(), userRouter);
const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`server running on port ${port}`))