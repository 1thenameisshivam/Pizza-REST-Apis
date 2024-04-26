import Joi from "joi";
import jwt from "jsonwebtoken";
import refreshTokenModel from "../model/refreshTokenModel.js";
import createError from "http-errors";
import userModel from "../model/userModel.js";
import { jwtService } from "../../services/jwtService.js";
import { REFRESH_SECRET } from "../../config/index.js";
const refreshController = async (req, res, next) => {
  //   const {refresh_token} = req.body;
  // validation
  const schema = Joi.object({
    refresh_token: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return next(createError(400, error));
  }
  // finding refresh token
  let refreshToken;
  try {
    refreshToken = await refreshTokenModel.findOne({
      token: req.body.refresh_token,
    });
    if (!refreshToken) {
      return next(createError(400, "Invalid refresh token"));
    }

    let id;
    try {
      const { userId } = jwt.verify(refreshToken.token, REFRESH_SECRET);
      id = userId;
    } catch (err) {
      return next(createError(401, "Invalid refresh token"));
    }

    // find user
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return next(createError(401, "No user found!"));
    }

    // tokens
    // Toekn
    const access_token = jwtService({ userId: user._id, role: user.role });
    const refresh_token = jwtService(
      { userId: user._id, role: user.role },
      "1y",
      REFRESH_SECRET
    );
    // database whitelist
    await refreshTokenModel.create({ token: refresh_token });
    res.json({ access_token, refresh_token });
  } catch (err) {
    return next(createError(401, "Something went wrong " + err.message));
  }
};

export default refreshController;
