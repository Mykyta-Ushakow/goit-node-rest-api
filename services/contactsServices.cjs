const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
	try {
		const data = await fs.readFile(contactsPath);

		const resp = JSON.parse(data.toString());

		return resp;
	} catch (error) {
		console.log(`${error.message}\n`);
	}
}

async function getContactById(contactId) {
	try {
		const data = await listContacts();

		const result = data.find((item) => item.id === contactId) || null;

		return result;
	} catch (error) {
		console.log(error);
	}
}

async function removeContact(contactId) {
	try {
		const prevData = await listContacts();

		const toRemove = prevData.find((item) => item.id === contactId) || null;

		if (!toRemove) return console.log("No such contact") || toRemove;

		const newData = prevData.filter((item) => item.id !== toRemove.id);

		await fs.writeFile(contactsPath, JSON.stringify(newData));

		return toRemove;
	} catch (error) {
		console.log(error);
	}
}

async function addContact(name, email, phone) {
	try {
		const prevData = await listContacts();

		const toAdd = { name, email, phone, id: uuidv4() };

		const isPresent = prevData.find((item) => item.name === toAdd.name);

		if (isPresent) return console.log("This name is already taken") || null;

		const newData = [...prevData, toAdd];

		await fs.writeFile(contactsPath, JSON.stringify(newData));

		return toAdd;
	} catch (error) {
		console.log(error);
	}
}

async function updateContact(contactId) {}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
