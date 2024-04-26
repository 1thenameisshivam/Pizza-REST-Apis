import Joi from "joi";
import refreshTokenModel from "../model/refreshTokenModel.js";

const logoutController = async (req, res) => {
  const refreshSchema = Joi.object({
    refresh_token: Joi.string().required(),
  });
  const { error } = refreshSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  try {
    await refreshTokenModel.deleteOne({ token: req.body.refresh_token });
  } catch (err) {
    return next(new Error("Something went wrong in the database"));
  }
  res.json({ status: 1 });
};

export default logoutController;
