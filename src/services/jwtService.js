import { JWT_SECRET } from "../config/index.js";
import jwt from "jsonwebtoken";
export const jwtService = (payload, expiry = "60s") => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expiry });
};
