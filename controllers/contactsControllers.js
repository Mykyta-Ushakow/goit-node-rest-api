import { json } from "express";
import {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContactById,
} from "../services/contactsServices.cjs";

import { catchAsync } from "../helpers/Wraps.cjs";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = catchAsync(async (_, res) => {
	const data = await listContacts();

	res.status(200).json(data);
});

export const getOneContact = catchAsync(async (req, res) => {
	const { id } = req.params;
	const data = await getContactById(id);

	if (!data) throw new HttpError(404);

	res.status(200).json(data);
});

export const deleteContact = catchAsync(async (req, res) => {
	const { id } = req.params;
	const data = await removeContact(id);

	if (!data) throw new HttpError(404);

	res.status(200).json(data);
});

export const createContact = catchAsync(async (req, res) => {
	const { name, email, phone } = req.body;

	const result = await addContact(name, email, phone);

	if (!result) throw new HttpError(409, "This name is already taken");

	res.status(201).json(result);
});

export const updateContact = catchAsync(async (req, res) => {
	const { id } = req.params;

	const result = await updateContactById(id, req.body);

	if (!result) throw new HttpError(404);

	res.status(200).json(result);
});
