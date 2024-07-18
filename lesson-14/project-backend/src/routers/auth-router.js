import { Router } from "express";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import {userSignupSchema, userSigninSchema, userGoogleAuthCodeSchema} from "../validation/user-schemas.js";

import { signupController, verifyController, signinController, refreshController, signoutController, getGoogleOAuthUrlController, authGoogleController } from "../controllers/auth-controllers.js";

const authRouter = Router();

authRouter.post("/signup", validateBody(userSignupSchema), ctrlWrapper(signupController));

authRouter.get("/verify", ctrlWrapper(verifyController));

authRouter.post("/signin", validateBody(userSigninSchema), ctrlWrapper(signinController))

authRouter.get("/get-oauth-url", ctrlWrapper(getGoogleOAuthUrlController));

authRouter.post("/cofirfm-google-auth", validateBody(userGoogleAuthCodeSchema), ctrlWrapper(authGoogleController));

authRouter.post("/refresh", ctrlWrapper(refreshController));

authRouter.post("/signout", ctrlWrapper(signoutController))

export default authRouter;
