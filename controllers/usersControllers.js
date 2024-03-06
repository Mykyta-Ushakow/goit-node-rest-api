import { catchAsync } from "../helpers/Wraps.cjs";
import { signToken } from "../helpers/JWTLogic.js";
import { comparePasswords, hashPassword } from "../helpers/Hashing.js";
import HttpError from "../helpers/HttpError.js";

import { createNewUser, logUserToken } from "../services/usersServices.js";
import User from "../models/userModel.js";

const registerUser = catchAsync(async (req, res) => {
	const { email, password } = req.body;

	const isPresent = await User.findOne({ email });
	if (isPresent) throw new HttpError(409, "Email already registered");

	const finalPassword = await hashPassword(password);

	const newUser = await createNewUser({
		...req.body,
		password: finalPassword,
	});

	const verificationToken = signToken(newUser._id);

	newUser.token = verificationToken;
	await newUser.save();

	res.status(201).json({
		user: { email: newUser.email, subscription: newUser.subscription },
		token: verificationToken,
	});
});

const logInUser = catchAsync(async (req, res) => {
	const { email, password } = req.body;

	console.log(req.user);

	const thisUser = await User.findOne({ email });
	if (!thisUser) throw new HttpError(401, "Email or password is wrong");

	const isAuthentic = await comparePasswords(password, thisUser.password);
	if (!isAuthentic) throw new HttpError(401, "Email or password is wrong");

	const newToken = await signToken(thisUser.id);

	const updatedUser = await logUserToken(thisUser.email, newToken);

	res.status(200).json({
		user: { email: updatedUser.email, subscription: updatedUser.subscription },
		token: updatedUser.token,
	});
});

const logOutUser = catchAsync(async (req, res) => {});

const getUserData = () => {};

const updateSubscription = () => {};

export { registerUser, logInUser, logOutUser, getUserData, updateSubscription };
