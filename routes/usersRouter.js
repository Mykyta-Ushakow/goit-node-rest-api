import express from "express";

import validateBody from "./../middlewares/validateBody.js";
import { registerUserSchema } from "../schemas/userJoiSchemas.js";

import {
	logInUser,
	logOutUser,
	registerUser,
	getUserData,
	updateSubscription,
} from "../controllers/usersControllers.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(registerUserSchema), registerUser);
usersRouter.post("/login", logInUser);
usersRouter.post("/logout", logOutUser);
usersRouter.get("/current", getUserData);
usersRouter.patch("/", updateSubscription);

export default usersRouter;
