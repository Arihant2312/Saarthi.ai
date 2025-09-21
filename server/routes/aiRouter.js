import express from 'express';

import { auth } from '../middlewares/auth.js'; // Add `.js` if using ES modules
import { generateArticle,generateimage,blogtitles,removeimagebackground,resumereview ,removeimageobject,summarizearticle,musicgeneration} from '../controllers/aicontroller.js'; // Also add `.js` here if needed
import { upload } from '../configs/multer.js';
//import { diskUpload } from '../configs/uploader.js';

const aiRouter = express.Router();
aiRouter.post('/generate-article', auth, generateArticle);
aiRouter.post('/generate-blog-title', auth, blogtitles);
aiRouter.post('/generate-image', auth, generateimage);
aiRouter.post('/generate-music-recommendation', auth, musicgeneration);
// Corrected middleware order: auth comes before file upload
aiRouter.post('/remove-image-background', auth,upload.single('image'), removeimagebackground);
aiRouter.post('/remove-image-object', auth, upload.single('image'), removeimageobject);
aiRouter.post('/resume-review', auth, upload.single('resumefile'), resumereview);
aiRouter.post('/summarize-article', auth, upload.single('article'), summarizearticle);





export default aiRouter;
