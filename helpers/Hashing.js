import bcrypt from "bcrypt";

const hashPassword = (password, salt = 10) => bcrypt.hash(password, salt);

export { hashPassword };
