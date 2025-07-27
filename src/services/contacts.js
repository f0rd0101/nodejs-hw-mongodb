import { ContactsCollection } from '../db/models/contact.js';


export const getAllContacts = async (page,perPage,sortBy,sortOrder, userId) => {
 
  const skip = page > 0 ? (page - 1)*perPage : 0;
  const contactsQuery = ContactsCollection.find();
  contactsQuery.where("userId").equals(userId);
  const totalItems = await ContactsCollection.countDocuments({ userId });
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

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({_id: contactId, userId});
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId,userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId
  });

  return contact;
};

export const updateContact = async (contactId, payload,userId) => {
  return ContactsCollection.findOneAndUpdate({
    _id: contactId,
    userId
  }, payload, {
    new: true,
  });
};