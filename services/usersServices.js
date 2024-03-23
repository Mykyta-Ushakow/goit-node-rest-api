import User from "../models/userModel.js";

const createNewUser = (userData) => User.create(userData);

const logUserToken = (email, token) =>
	User.findOneAndUpdate({ email }, { token }, { returnDocument: "after" });

const wipeUserToken = (_id) => User.findByIdAndUpdate(_id, { token: "" });

const updateSubscription = (_id, subscription) =>
	User.findByIdAndUpdate(_id, { subscription }, { returnDocument: "after" });

const updateAvatar = (_id, avatarURL) =>
	User.findByIdAndUpdate(_id, { avatarURL }, { returnDocument: "after" });

const updateVerification = (_id, conditions) =>
	User.findByIdAndUpdate(_id, conditions, { returnDocument: "after" });

export {
	createNewUser,
	logUserToken,
	wipeUserToken,
	updateSubscription,
	updateAvatar,
	updateVerification,
};
