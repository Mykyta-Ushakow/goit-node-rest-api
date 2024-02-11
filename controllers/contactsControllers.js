import { json } from "express";
import {
	listContacts,
	getContactById,
	removeContact,
	addContact,
} from "../services/contactsServices.cjs";

import { catchAsync } from "../helpers/Wraps.cjs";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = catchAsync(async (req, res) => {
	const data = await listContacts();

	res.status(200).json(data);
});

export const getOneContact = catchAsync(async (req, res, next) => {
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

export const createContact = async (req, res) => {};

export const updateContact = async (req, res) => {};
