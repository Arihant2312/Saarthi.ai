import express from 'express';
import auth from '../middlewares/auth.js';
import { getPublishedCreations, getUserCreations, togglelikeCreations } from '../controllers/usercontroller.js';

const userRouter = express.Router();

userRouter.get('/getuser-creations', auth, getUserCreations);
userRouter.get('/get-published-creations', auth, getPublishedCreations);
userRouter.post('/toggle-like', auth, togglelikeCreations);

export default userRouter;
