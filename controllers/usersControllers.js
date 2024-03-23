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
	updateVerification,
	wipeUserToken,
} from "../services/usersServices.js";
import { sendVerificationEmail } from "../services/emailServices.js";

import User from "../models/userModel.js";

import gravatar from "gravatar";
import Jimp from "jimp";
import { v4 } from "uuid";

const registerUser = catchAsync(async (req, res) => {
	const { email, password } = req.body;

	const isPresent = await User.findOne({ email });
	if (isPresent) throw new HttpError(409, "Email already registered");

	const finalPassword = await hashPassword(password);

	const avatarURL = gravatar.url(email, { s: 200 }, true);

	const emailVerification = v4();

	const newUser = await createNewUser({
		...req.body,
		verificationToken: emailVerification,
		avatarURL,
		password: finalPassword,
	});

	const JWTToken = signToken(newUser._id);

	newUser.token = JWTToken;
	await newUser.save();

	await sendVerificationEmail(
		email,
		`http://localhost:${
			process.env.PORT ?? 4000
		}/api/users/verify/${emailVerification}`
	);

	res.status(201).json({
		user: { email: newUser.email, subscription: newUser.subscription },
		token: JWTToken,
	});
});

const logInUser = catchAsync(async (req, res) => {
	const { email, password } = req.body;

	const thisUser = await User.findOne({ email });
	if (!thisUser) throw new HttpError(401, "Email or password is wrong");
	if (thisUser.verify === false) throw new HttpError(401, "Email not verified");

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

const verifyEmail = catchAsync(async (req, res) => {
	const { verificationToken } = req.params;

	const user = await User.findOne({ verificationToken });
	if (!user) throw new HttpError(404, "User not found");

	await updateVerification(user._id, {
		verificationToken: null,
		verify: true,
	});

	res.status(200).json({ message: "Verification successful" });
});

const resendVerifyEmail = catchAsync(async (req, res) => {
	const { email } = req.body;

	const user = await User.findOne({ email });
	if (!user) throw new HttpError(404, "User not found");
	if (user.verify === true || user.verificationToken === null)
		throw new HttpError(400, "Verification has already been passed");

	await sendVerificationEmail(
		email,
		`http://localhost:${process.env.PORT ?? 4000}/api/users/verify/${
			user.verificationToken
		}`
	);

	res.status(200).json({ message: "Verification email sent" });
});

export {
	registerUser,
	logInUser,
	logOutUser,
	getCurrentUser,
	updateSubscriptionPlan,
	updateUserAvatar,
	verifyEmail,
	resendVerifyEmail,
};
