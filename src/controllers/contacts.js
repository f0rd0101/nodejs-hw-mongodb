import {
  updateContact,
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
} from '../services/contacts.js';
import * as fs from "node:fs/promises";
import path from "node:path";
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import {uploadToCloudinary} from '../utils/uploadToCloudinary.js';


export const getContactsController = async (req, res, next) => {
    const {page,perPage} = parsePaginationParams(req.query);
    const {sortBy,sortOrder} = parseSortParams(req.query);
   
    
    
  try {
    const contacts = await getAllContacts(page,perPage, sortBy,sortOrder, req.user.id);

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user.id;
  const contact = await getContactById(contactId,userId);


  if (contact === null) {
    throw createHttpError(404, 'Contact not found');
  }


  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  // await fs.rename(req.file.path, path.resolve("src/uploads/avatars", req.file.filename));
  const result = await uploadToCloudinary(req.file.path);
  await fs.unlink(req.file.path);
  



  const contact = await createContact({...req.body,avatar: result.secure_url, userId: req.user.id});

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user.id;
  const contact = await deleteContact(contactId, userId);

  if (contact === null) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).end();
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user.id;
  const result = await updateContact(contactId, req.body,userId);

  if (result === null) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully updated a contact with id ${contactId}!`,
    data: result,
  });
};