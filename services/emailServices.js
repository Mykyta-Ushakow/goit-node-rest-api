import nodemailer from "nodemailer";
import serverConfig from "../configs/serverConfig.js";
import dotenv from "dotenv";

dotenv.config();

const nodemailerConfig = {
	host: "smtp.meta.ua",
	port: 465,
	secure: true,
	auth: {
		user: serverConfig.metaEmail,
		pass: serverConfig.metaPass,
	},
};

const sendVerificationEmail = (email, link) => {
	const transport = nodemailer.createTransport(nodemailerConfig);

	const letter = {
		to: email,
		from: serverConfig.metaEmail,
		subject: "Verification Email for GOIT-HW-06",
		html: `<p>Please<strong> verify your email</strong> by follwoing this <a href=${link}>link</a></p>`,
		text: `Please verify your email by follwoing this link: 
        ${link}`,
	};

	return transport
		.sendMail(letter)
		.then(() => console.log("Email send success"))
		.catch((error) => console.log(error.message));
};

export { sendVerificationEmail };
