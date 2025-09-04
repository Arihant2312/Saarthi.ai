import express from 'express';
import { auth } from '../middlewares/auth.js'; // Add `.js` if using ES modules
import { generateArticle,generateimage,blogtitles,removeimagebackground,resumereview ,removeimageobject,summarizearticle} from '../controllers/aicontroller.js'; // Also add `.js` here if needed
import { upload } from '../configs/multer.js';

const aiRouter = express.Router();

aiRouter.post('/generate-article', auth, generateArticle);
aiRouter.post('/generate-blog-title', auth, blogtitles);
aiRouter.post('/generate-image', auth, generateimage);
aiRouter.post('/remove-image-background',upload.single('image'), auth, removeimagebackground);
aiRouter.post('/remove-image-object',upload.single('image'), auth, removeimageobject);

aiRouter.post('/resume-review', upload.single('resumefile'), auth, resumereview);
aiRouter.post('/summarize-article',upload.single('article'), auth, summarizearticle);




export default aiRouter;
