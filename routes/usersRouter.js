import express from "express";

import {
	logInUser,
	logOutUser,
	registerUser,
	getCurrentUser,
	updateSubscriptionPlan,
	updateUserAvatar,
	verifyEmail,
	resendVerifyEmail,
} from "../controllers/usersControllers.js";

import {
	logInSchema,
	registerUserSchema,
	resendEmailSchema,
	updateSubscriptionSchema,
} from "../schemas/userJoiSchemas.js";

import validateBody from "./../middlewares/validateBody.js";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";
import uploadIMG from "../middlewares/uploadIMG.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(registerUserSchema), registerUser);

usersRouter.post("/login", validateBody(logInSchema), logInUser);

usersRouter.post("/logout", authenticateJWT, logOutUser);

usersRouter.get("/current", authenticateJWT, getCurrentUser);

usersRouter.patch(
	"/",
	authenticateJWT,
	validateBody(updateSubscriptionSchema),
	updateSubscriptionPlan
);

usersRouter.patch(
	"/avatars",
	authenticateJWT,
	uploadIMG.single("avatar"),
	updateUserAvatar
);

usersRouter.get("/verify/:verificationToken", verifyEmail);

usersRouter.post("/verify", validateBody(resendEmailSchema), resendVerifyEmail);

export default usersRouter;
