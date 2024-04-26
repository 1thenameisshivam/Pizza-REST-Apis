import express from "express";
import registerController from "../controller/registerController.js";
import { loginController } from "../controller/loginController.js";
import userController from "../controller/userController.js";
import refreshController from "../controller/refreshController.js";
import auth from "../../middleware/auth.js";
import logoutController from "../controller/logoutController.js";
const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.get("/me", auth, userController);
userRouter.post("/refresh", refreshController);
userRouter.post("/logout", auth, logoutController);

export default userRouter;
