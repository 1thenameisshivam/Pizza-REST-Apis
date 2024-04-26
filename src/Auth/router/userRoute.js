import express from "express";
import registerController from "../controller/registerController.js";
const userRouter = express.Router();

userRouter.post("/register", registerController);

export default userRouter;
