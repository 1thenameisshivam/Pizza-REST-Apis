import createError from "http-errors";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
const auth = async (req, res, next) => {
  //getting token from header
  const token = req.header("Authorization");

  //checking if token is present
  if (!token) {
    return next(createError(401, "Token not present"));
  }

  // extracting token from header

  const tokenArray = token.split(" ")[1];

  try {
    //verifying token
    const { userId, role } = await jwt.verify(tokenArray, JWT_SECRET);
    const user = { userId, role };

    req.user = user;
    next();
  } catch (err) {
    return next(createError(401, "Token not valid" + err));
  }
};

export default auth;
