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
import isValidId from "../middlewares/validateID.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticateJWT, getAllContacts);

contactsRouter.get("/:id", isValidId, authenticateJWT, getOneContact);

contactsRouter.delete("/:id", isValidId, authenticateJWT, deleteContact);

contactsRouter.post(
	"/",
	authenticateJWT,
	validateBody(createContactSchema),
	createContact
);

contactsRouter.put(
	"/:id",
	isValidId,
	authenticateJWT,
	validateBody(updateContactSchema),
	updateContact
);

contactsRouter.patch(
	"/:id/favorite",
	isValidId,
	authenticateJWT,
	validateBody(updateFavoriteSchema),
	updateFavorite
);

export default contactsRouter;
