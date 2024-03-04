import { catchAsync } from "../helpers/Wraps.cjs";
import { signToken } from "../helpers/JWTLogic.js";
import { hashPassword } from "../helpers/Hashing.js";
import HttpError from "../helpers/HttpError.js";

import { createNewUser } from "../services/userServices.js";
import User from "../models/userModel.js";

import { v4 } from "uuid";

const registerUser = catchAsync(async (req, res) => {
	const { email, password } = req.body;

	const isPresent = await User.findOne({ email });
	if (isPresent) throw new HttpError(409, "Email already registered");

	const finalPassword = await hashPassword(password);
	const verificationToken = signToken(v4());

	const newUser = await createNewUser({
		...req.body,
		password: finalPassword,
		token: verificationToken,
	});
	console.log(newUser);

	res.status(200).json(newUser);
});

const logInUser = () => {};

const logOutUser = () => {};

const getUserData = () => {};

const updateSubscription = () => {};

export { registerUser, logInUser, logOutUser, getUserData, updateSubscription };
