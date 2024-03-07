import { catchAuth } from "../helpers/Wraps.js";
import HttpError from "../helpers/HttpError.js";

import serverConfig from "../configs/serverConfig.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const authenticateJWT = catchAuth(async (req, res, next) => {
	const { authorization = "" } = req.headers;
	if (!authorization) throw new HttpError(401, "Not authorized");

	const [_, token] = authorization.split(" ");

	const { id } = jwt.verify(token, serverConfig.jwtSecret);

	const user = await User.findById(id);

	if (!user || !user.token || user.token !== token)
		throw new HttpError(401, "Not authorized");

	req.user = user;
	next();
});

export { authenticateJWT };
