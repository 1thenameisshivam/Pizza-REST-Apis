import userModel from "../model/userModel.js";
import createError from "http-errors";
const userController = async (req, res, next) => {
  const { userId } = req.user;

  // find user by id

  try {
    const user = await userModel
      .findById(userId)
      .select("-createdAt -updatedAt -__v");

    // check if user exists
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // send user data
    res.status(200).json({
      user,
    });
  } catch (err) {
    return next(createError(500, "Error finding user" + err));
  }
};

export default userController;
