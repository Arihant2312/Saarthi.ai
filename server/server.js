import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import aiRouter from './routes/aiRouter.js';
import userRouter from './routes/userRouter.js';
import connectcloudinary from './configs/cloudinary.js';

const app = express();

// Initialize Cloudinary
(async () => {
  await connectcloudinary();
})();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://saarthi-dev-jade.vercel.app"
    ],
    credentials: true,
  })
);

app.options(/.*/, cors());


// ✅ ALLOW PREFLIGHT
//app.options('/*', cors());


app.use(express.json());

// ✅ Clerk AFTER CORS
app.use(clerkMiddleware());

// Test route
app.get('/', (req, res) => res.send("Server is running"));

// ✅ Protected routes


app.use('/api/ai', requireAuth(), aiRouter);
app.use('/api/user', requireAuth(), userRouter);





const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
