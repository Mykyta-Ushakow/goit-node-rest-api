import {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContactById,
	updateStatusContact,
} from "../services/contactsServices.js";

import { catchAsync } from "../helpers/Wraps.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = catchAsync(async (req, res) => {
	const { _id: owner } = req.user;
	const data = await listContacts(owner);

	res.status(200).json(data);
});

export const getOneContact = catchAsync(async (req, res) => {
	const { id: _id } = req.params;
	const { _id: owner } = req.user;

	const data = (await getContactById({ _id, owner })) || null;

	if (!data) throw new HttpError(404, "You don't have matching contact");

	res.status(200).json(data);
});

export const deleteContact = catchAsync(async (req, res) => {
	const { id: _id } = req.params;
	const { _id: owner } = req.user;

	const data = (await removeContact({ _id, owner })) || null;

	if (!data) throw new HttpError(404, "You don't have matching contact");

	res.status(200).json(data);
});

export const createContact = catchAsync(async (req, res) => {
	const { name, email, phone } = req.body;
	const { _id: owner } = req.user;

	const result = await addContact({ name, email, phone, owner });

	res.status(201).json(result);
});

export const updateContact = catchAsync(async (req, res) => {
	const { id: _id } = req.params;
	const { _id: owner } = req.user;

	const result = (await updateContactById({ _id, owner }, req.body)) || null;

	if (!result) throw new HttpError(404, "You don't have matching contact");

	res.status(200).json(result);
});

export const updateFavorite = catchAsync(async (req, res) => {
	const { id: _id } = req.params;
	const { _id: owner } = req.user;

	const result = (await updateStatusContact({ _id, owner }, req.body)) || null;

	if (!result) throw new HttpError(404, "You don't have matching contact");

	res.status(200).json(result);
});
