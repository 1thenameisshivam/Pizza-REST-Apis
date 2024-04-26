import express from "express";
import registerController from "../controller/registerController.js";
import { loginController } from "../controller/loginController.js";
const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);

export default userRouter;
