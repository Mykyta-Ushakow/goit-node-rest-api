import User from "./../models/userModel.js";

const createNewUser = (userData) => User.create(userData);
const logInUser = () => {};
const logOutUser = () => {};
const getUserData = () => {};
const updateSubscription = () => {};

export {
	createNewUser,
	logInUser,
	logOutUser,
	getUserData,
	updateSubscription,
};
