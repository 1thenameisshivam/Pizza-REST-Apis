import Joi from "joi";
import createError from "http-errors";
import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";
import { jwtService } from "../../services/jwtService.js";
import refreshTokenModel from "../model/refreshTokenModel.js";
import { REFRESH_SECRET } from "../../config/index.js";
export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  // validation
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(6)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return next(createError(400, error));
  }
  let token;
  let refresh_token;
  try {
    //finding user
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // comparing password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createError(401, "Incorrect password"));
    }

    // token generation
    token = jwtService({ userId: user._id, role: user.role });
    refresh_token = jwtService(
      { userId: user._id, role: user.role },
      "1y",
      REFRESH_SECRET
    );
    // saving refresh token
    try {
      await refreshTokenModel.create({ token: refresh_token });
    } catch (err) {
      return next(createError(500, "Error saving refresh token"));
    }
  } catch (err) {
    return next(createError(500, "Error logging in user" + err));
  }

  return res.status(200).json({
    massage: "User logged in successfully",
    token,
    refresh_token,
  });
};
