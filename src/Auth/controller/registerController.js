import Joi from "joi";
import userModel from "../model/userModel.js";
import createError from "http-errors";
import bcrypt from "bcrypt";
import { jwtService } from "../../services/jwtService.js";
const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // validation
    const schema = Joi.object({
      name: Joi.string().min(3).max(35).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .min(6)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repeat_password: Joi.ref("password"),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return next(createError(400, error));
    }

    // check if user already exists
    try {
      const user = await userModel.findOne({ email });
      if (user) {
        return next(createError(400, "User already exists"));
      }
    } catch (err) {
      return next(createError(500, "Error registering user"));
    }

    // password hashing
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return next(
        createError(
          500,
          "an unexpected error occurs on the server side during password hashing" +
            err
        )
      );
    }

    // user creation
    let token;
    try {
      const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
      });
      // token generation from jwt
      try {
        token = jwtService({ userId: user._id, role: user.role });
      } catch (err) {
        return next(createError(500, "Error in toke generation"));
      }
    } catch (err) {
      return next(createError(500, "Error registering user" + err));
    }

    // sending response
    res.json({
      message: "User registered successfully",
      token,
    });
  } catch (err) {
    return next(createError(500, "Error registering user" + err));
  }
};

export default registerController;
