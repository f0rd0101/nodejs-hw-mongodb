import { ContactsCollection } from '../db/models/contact.js';


export const getAllContacts = async (page,perPage,sortBy,sortOrder) => {
 
  const skip = page > 0 ? (page - 1)*perPage : 0;
  const contactsQuery = ContactsCollection.find();
  const totalItems = await ContactsCollection.find().countDocuments();
  const data = await contactsQuery.sort({[sortBy]: sortOrder}).skip(skip).limit(perPage);
  const totalPages = Math.ceil(totalItems/perPage); 
  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages > page,
    

  };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};

export const updateContact = async (contactId, payload) => {
  return ContactsCollection.findByIdAndUpdate(contactId, payload, {
    new: true,
  });
};