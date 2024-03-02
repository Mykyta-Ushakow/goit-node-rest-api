import express from "express";
import {
	logInUser,
	logOutUser,
	registerNewUser,
	getUserData,
	updateSubscription,
} from "../services/userServices.js";

const usersRouter = express.Router();

usersRouter.post("/register", registerNewUser);
usersRouter.post("/login", logInUser);
usersRouter.post("/logout", logOutUser);
usersRouter.get("/current", getUserData);
usersRouter.patch("/", updateSubscription);

export default usersRouter;
