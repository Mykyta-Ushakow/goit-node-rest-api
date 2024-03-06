import User from "../models/userModel.js";

const createNewUser = (userData) => User.create(userData);
const logUserToken = (email, token) =>
	User.findOneAndUpdate({ email }, { token }, { returnDocument: "after" });
const logOutUser = () => {};
const getUserData = () => {};
const updateSubscription = () => {};

export {
	createNewUser,
	logUserToken,
	logOutUser,
	getUserData,
	updateSubscription,
};
