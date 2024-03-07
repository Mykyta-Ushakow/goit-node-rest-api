import Contact from "../models/contactModel.js";

const safeFields = "name email phone favorite";

const listContacts = (owner) => Contact.find({ owner }, safeFields);

const getContactById = (conditions = {}) =>
	Contact.findOne(conditions, safeFields);

const removeContact = (conditions = {}) =>
	Contact.findOneAndDelete(conditions, { projection: safeFields });

const addContact = (contactData) => Contact.create(contactData);

const updateContactById = (conditions, newData) =>
	Contact.findOneAndUpdate(conditions, newData, {
		returnDocument: "after",
		projection: safeFields,
	});

const updateStatusContact = (conditions, newData) =>
	Contact.findOneAndUpdate(conditions, newData, {
		returnDocument: "after",
		projection: safeFields,
	});

export {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContactById,
	updateStatusContact,
};
