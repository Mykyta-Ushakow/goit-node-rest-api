import { model } from "mongoose";
import oneUserSchema from "../schemas/userDBSchemas.js";

const User = model("User", oneUserSchema);

export default User;
