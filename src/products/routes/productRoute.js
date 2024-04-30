import express from "express";
import upload from "../../middleware/multer.js";
import createController from "../controller/createController.js";
import auth from "../../middleware/auth.js";
import admin from "../../middleware/admin.js";
import updateController from "../controller/updateController.js";
import deleteController from "../controller/deleteController.js";
import getAllController from "../controller/getAllControler.js";
import getSingleController from "../controller/getSingleController.js";
const productRoute = express.Router();

productRoute.post("/create", upload.single("image"), createController);
productRoute.put(
  "/update/:id",
  [auth, admin, upload.single("image")],
  updateController
);
productRoute.delete("/delete/:id", [auth, admin], deleteController);
productRoute.get("/", getAllController);
productRoute.get("/:id", getSingleController);
export default productRoute;
