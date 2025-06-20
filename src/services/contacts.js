import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (studentId) => {
  const contact = await ContactsCollection.findById(studentId);
  return contact;
};

