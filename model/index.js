const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactPath = path.join(__dirname, "contacts.json");

const readFile = async (path) => {
  const contacts = await fs.readFile(path, "utf-8");
  return JSON.parse(contacts);
};

const writeFile = async (path, data) => {
  return (contacts = await fs.writeFile(path, JSON.stringify(data)));
};

const listContacts = async () => {
  return await readFile(contactPath);
};

const getContactById = async (contactId) => {
  const contacts = await readFile(contactPath);
  const findContact = contacts.find((item) => String(item.id) === String(contactId));
  return findContact;
};

const removeContact = async (contactId) => {
  const contacts = await readFile(contactPath);

  const index = contacts.findIndex((item) => String(item.id) === String(contactId));

  if (index === -1) {
    return null;
  }
  const delContact = contacts.splice(index, 1);

  await writeFile(contactPath, contacts);

  return delContact;
};

const addContact = async (body) => {
  const contacts = await readFile(contactPath);

  const newContact = { id: v4(), ...body };

  const newContacts = [...contacts, newContact];

  await writeFile(contactPath, newContacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readFile(contactPath);

  const index = contacts.findIndex((item) => String(item.id) === String(contactId));

  if (index === -1) {
    return null;
  }

  contacts[index] = { id: contactId, ...body };

  await writeFile(contactPath, contacts);

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
