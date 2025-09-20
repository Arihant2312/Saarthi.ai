import multer from "multer";

// Memory storage keeps file in req.file.buffer
const storage = multer.memoryStorage();

export const upload = multer({ storage });
console.log("Multer memory storage loaded");
