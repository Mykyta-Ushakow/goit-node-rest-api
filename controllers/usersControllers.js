import * as fs from "node:fs/promises";
import * as path from "node:path";

import { catchAsync } from "../helpers/Wraps.js";
import { signToken } from "../helpers/JWTLogic.js";
import { comparePasswords, hashPassword } from "../helpers/Hashing.js";
import HttpError from "../helpers/HttpError.js";

import {
	createNewUser,
	logUserToken,
	updateAvatar,
	updateSubscription,
	wipeUserToken,
} from "../services/usersServices.js";

import User from "../models/userModel.js";

import gravatar from "gravatar";
import Jimp from "jimp";

const registerUser = catchAsync(async (req, res) => {
	const { email, password } = req.body;

	const isPresent = await User.findOne({ email });
	if (isPresent) throw new HttpError(409, "Email already registered");

	const finalPassword = await hashPassword(password);

	const avatarURL = gravatar.url(email, { s: 200 }, true);

	const newUser = await createNewUser({
		...req.body,
		avatarURL,
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

const logOutUser = catchAsync(async (req, res) => {
	const { _id } = req.user;

	await wipeUserToken(_id);

	res.status(204).json();
});

const getCurrentUser = catchAsync(async (req, res) => {
	const { email, subscription } = req.user;
	res.status(200).json({ email, subscription });
});

const updateSubscriptionPlan = catchAsync(async (req, res) => {
	const { _id } = req.user;
	const { subscription } = req.body;

	if (subscription === req.user.subscription)
		throw new HttpError(409, "Already using this plan");

	const newUser = await updateSubscription(_id, subscription);

	res.status(200).json({
		msg: "Sucess!",
		user: { subscription: newUser.subscription, email: newUser.email },
	});
});

const updateUserAvatar = catchAsync(async (req, res) => {
	if (!req.file) throw new HttpError(400, "No image provided");

	const { _id } = req.user;

	const newLocation = path.join(
		process.cwd(),
		"public",
		"avatars",
		req.file.filename
	);

	const avatarURL = `/avatars/${req.file.filename}`;

	fs.rename(req.file.path, newLocation, (err) => {
		if (err) throw err;
	});
	const newAvatar = await Jimp.read(newLocation);
	newAvatar.cover(250, 250).write(newLocation);

	await updateAvatar(_id, avatarURL);

	res.status(200).json({ avatarURL });
});

export {
	registerUser,
	logInUser,
	logOutUser,
	getCurrentUser,
	updateSubscriptionPlan,
	updateUserAvatar,
};
