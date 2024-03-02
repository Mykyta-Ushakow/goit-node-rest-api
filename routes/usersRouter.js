import express from "express";
import { logInUser, registerNewUser } from "../services/userServices.js";

const usersRouter = express.Router();

usersRouter.post("/register", registerNewUser);
usersRouter.post("/login", logInUser);

export default usersRouter;
