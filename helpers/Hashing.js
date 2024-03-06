import bcrypt from "bcrypt";

const hashPassword = (password, salt = 10) => bcrypt.hash(password, salt);

const comparePasswords = (incoming, present) =>
	bcrypt.compare(incoming, present);

export { hashPassword, comparePasswords };
