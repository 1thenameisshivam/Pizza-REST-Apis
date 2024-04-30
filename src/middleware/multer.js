import multer from "multer";
import path from "node:path";

// Multer configuration with limits
const upload = multer({
  dest: path.resolve("__dirname", "../public/uploads/images"),
  limits: {
    fileSize: 5 * 1024 * 1024, // Max file size in bytes (5MB)
  },
});

export default upload;
