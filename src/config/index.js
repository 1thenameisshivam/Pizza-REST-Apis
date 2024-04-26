import dotenv from "dotenv";

dotenv.config();

export const { PORT, MODE, MONGO_URL, JWT_SECRET, REFRESH_SECRET } =
  process.env;
