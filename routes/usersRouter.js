import express from "express";

import {
	logInUser,
	logOutUser,
	registerUser,
	getUserData,
	updateSubscription,
} from "../controllers/usersControllers.js";

import { logInSchema, registerUserSchema } from "../schemas/userJoiSchemas.js";

import validateBody from "./../middlewares/validateBody.js";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(registerUserSchema), registerUser);

usersRouter.post("/login", validateBody(logInSchema), logInUser);

usersRouter.post("/logout", authenticateJWT, logOutUser);

usersRouter.get("/current", getUserData);

usersRouter.patch("/", updateSubscription);

export default usersRouter;
