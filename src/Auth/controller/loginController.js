import Joi from "joi";
import createError from "http-errors";
import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";
import { jwtService } from "../../services/jwtService.js";
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
  } catch (err) {
    return next(createError(500, "Error logging in user" + err));
  }

  return res.status(200).json({
    massage: "User logged in successfully",
    token,
  });
};
