import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";

import "./configs/dotenvConfig.js";
import contactsRouter from "./routes/contactsRouter.js";
import serverConfig from "./configs/serverConfig.js";

const app = express();

// MONGOOSE CONNECTION ====================

mongoose
	.connect(serverConfig.mongoUrl)
	.then(() => {
		console.log("Mongo DB connected..");
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});

// MIDDLEWARES ===========================

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// ROUTER ===========================

app.use("/api/contacts", contactsRouter);

// ERRORS ===========================

app.use((_, res) => {
	res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
	const { status = 500, message = "Server error" } = err;
	res.status(status).json({ message });
});

// SERVER INIT ===============================

const { port } = serverConfig;

app.listen(port, () => {
	console.log(`Server is running. Use our API on port: ${port}`);
});
