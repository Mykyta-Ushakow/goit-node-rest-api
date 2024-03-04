import { catchAsync } from "../helpers/Wraps.cjs";
import HttpError from "../helpers/HttpError.js";

import bcrypt from "bcrypt";
import { signToken } from "../helpers/JWTLogic.js";
import User from "../models/userModel.js";

const registerUser = catchAsync(async (req, res) => {
	console.log("working!");
	res.status(200).send("done");
});

const logInUser = () => {};

const logOutUser = () => {};

const getUserData = () => {
	console.log("working!");
};

const updateSubscription = () => {};

export { registerUser, logInUser, logOutUser, getUserData, updateSubscription };
