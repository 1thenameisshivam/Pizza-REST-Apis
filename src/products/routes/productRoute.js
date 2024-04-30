import express from "express";

const productRoute = express.Router();

productRoute.post("/create", (req, res) => {
  res.json({ message: "Hello from product route" });
});

export default productRoute;
