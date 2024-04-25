import express from "express";
import globleErrorHandler from "./middleware/globleErrorHandler.js";
const app = express();

app.use(express.json()); // json parsor

app.get("/", (req, res) => {
  res.json({ message: "Home route" });
});

app.use(globleErrorHandler); // error handler

export default app;
