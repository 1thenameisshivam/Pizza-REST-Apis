import { MODE } from "../config/index.js";
const globleErrorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;

  return res.status(status).json({
    message: err.message,
    errorStack: MODE === "development" ? err.stack : "",
  });
};

export default globleErrorHandler;
