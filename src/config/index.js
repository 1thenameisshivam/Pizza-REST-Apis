import dotenv from "dotenv";

dotenv.config();

export const {
  PORT,
  MODE,
  MONGO_URL,
  JWT_SECRET,
  REFRESH_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;
