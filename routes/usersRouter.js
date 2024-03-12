import express from "express";
import path from "path";

import {
	logInUser,
	logOutUser,
	registerUser,
	getCurrentUser,
	updateSubscriptionPlan,
	getUserAvatar,
} from "../controllers/usersControllers.js";

import {
	logInSchema,
	registerUserSchema,
	updateSubscriptionSchema,
} from "../schemas/userJoiSchemas.js";

import validateBody from "./../middlewares/validateBody.js";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";

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

usersRouter.get(
	"/avatar/:avatarUrl",
	// express.static(path.join(process.cwd(), "public", "avatars"))
	getUserAvatar
);

export default usersRouter;
