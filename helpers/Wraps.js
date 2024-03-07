import HttpError from "./HttpError.js";

const catchAsync = (fn) => (req, res, next) => {
	fn(req, res, next).catch((err) => next(err));
};

const catchAuth = (fn) => (req, res, next) => {
	fn(req, res, next).catch(() => next(new HttpError(401, "Not authorized")));
};

export { catchAsync, catchAuth };
