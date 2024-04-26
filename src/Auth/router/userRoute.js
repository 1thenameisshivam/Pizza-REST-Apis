import express from "express";
import registerController from "../controller/registerController.js";
import { loginController } from "../controller/loginController.js";
import userController from "../controller/userController.js";
import auth from "../../middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.get("/me", auth, userController);

export default userRouter;
