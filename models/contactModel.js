import { model, Schema } from "mongoose";
import oneContactSchema from "../schemas/contactsDBSchemas.js";

const Contact = model("contact", oneContactSchema);

export default Contact;
