import Contact from "../models/contactModel.js";

const listContacts = () => Contact.find();

const getContactById = (contactId) => Contact.findById(contactId);

const removeContact = (contactId) => Contact.findByIdAndDelete(contactId);

const addContact = (contactData) => Contact.create(contactData);

const updateContactById = (contactId, newData) =>
	Contact.findByIdAndUpdate(contactId, newData, { returnDocument: "after" });

const updateStatusContact = (contactId, body) =>
	Contact.findByIdAndUpdate(contactId, body, { returnDocument: "after" });

export {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContactById,
	updateStatusContact,
};
