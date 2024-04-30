import express from "express";
import upload from "../../middleware/multer.js";
const productRoute = express.Router();

productRoute.post("/create", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.json({ message: "Hello from product route" });
});

export default productRoute;
