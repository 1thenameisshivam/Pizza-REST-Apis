import { JWT_SECRET } from "../config/index.js";
import jwt from "jsonwebtoken";
export const jwtService = (payload, expiry = "60s",secret=JWT_SECRET) => {
  return jwt.sign(payload, secret, { expiresIn: expiry });
};
