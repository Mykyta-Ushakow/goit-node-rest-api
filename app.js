import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";

import "./configs/dotenvConfig.js";
import contactsRouter from "./routes/contactsRouter.js";
import serverConfig from "./configs/serverConfig.js";
import usersRouter from "./routes/usersRouter.js";

const app = express();

// MONGOOSE CONNECTION ====================

mongoose
	.connect(serverConfig.mongoUrl)
	.then(() => {
		console.log("Database connection successful.");

		const { port } = serverConfig;

		app.listen(port, () => {
			console.log(`Server is running. Use our API on port: ${port}`);
		});
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});

// MIDDLEWARES ======================

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ROUTERS ==========================

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

// ERRORS ===========================

app.use((_, res) => {
	res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
	const { status = 500, message = "Server error" } = err;
	res.status(status).json({ message });
});
