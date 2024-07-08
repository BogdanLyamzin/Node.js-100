import { Router } from "express";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import {userSignupSchema, userSigninSchema} from "../validation/user-schemas.js";

import { signupController, verifyController, signinController, refreshController, signoutController } from "../controllers/auth-controllers.js";

const authRouter = Router();

authRouter.post("/signup", validateBody(userSignupSchema), ctrlWrapper(signupController));

authRouter.get("/verify", ctrlWrapper(verifyController));

authRouter.post("/signin", validateBody(userSigninSchema), ctrlWrapper(signinController))

authRouter.post("/refresh", ctrlWrapper(refreshController));

authRouter.post("/signout", ctrlWrapper(signoutController))

export default authRouter;
