import express from "express";
import globleErrorHandler from "./middleware/globleErrorHandler.js";
import userRouter from "./Auth/router/userRoute.js";
const app = express();

app.use(express.json()); // json parsor

app.get("/", (req, res) => {
  res.json({ message: "Home route" });
});

app.use("/api/users", userRouter); // user route
app.use(globleErrorHandler); // error handler

export default app;
