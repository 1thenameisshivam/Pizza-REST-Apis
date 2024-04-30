import createError from "http-errors";
const admin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      createError(403, "You are not authorized to access this route")
    );
  }
  next();
};

export default admin;
