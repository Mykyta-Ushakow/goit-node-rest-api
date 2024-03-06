import express from "express";

import {
	getAllContacts,
	getOneContact,
	deleteContact,
	createContact,
	updateContact,
	updateFavorite,
} from "../controllers/contactsControllers.js";

import {
	createContactSchema,
	updateContactSchema,
	updateFavoriteSchema,
} from "../schemas/contactsJoiSchemas.js";

import validateBody from "../middlewares/validateBody.js";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticateJWT, getAllContacts);

contactsRouter.get("/:id", authenticateJWT, getOneContact);

contactsRouter.delete("/:id", authenticateJWT, deleteContact);

contactsRouter.post(
	"/",
	authenticateJWT,
	validateBody(createContactSchema),
	createContact
);

contactsRouter.put(
	"/:id",
	authenticateJWT,
	validateBody(updateContactSchema),
	updateContact
);

contactsRouter.patch(
	"/:id/favorite",
	authenticateJWT,
	validateBody(updateFavoriteSchema),
	updateFavorite
);

export default contactsRouter;
