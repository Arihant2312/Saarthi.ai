import multer from "multer";
import path from "path";

// ✅ Memory storage (for text/PDF summarizer etc.)
export const memoryUpload = multer({ storage: multer.memoryStorage() });

// ✅ Disk storage (for Cloudinary file-path uploads)
const diskStorage = multer.diskStorage({
  destination: "uploads/",                          // temp folder
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
export const diskUpload = multer({ storage: diskStorage });
