import express from 'express';

import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { upload } from '../middlewares/upload.js';
const router = Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId',isValidId, ctrlWrapper(getContactByIdController));
router.post('/contacts',upload.single("avatar"), validateBody(createContactSchema), jsonParser, ctrlWrapper(createContactController));
router.delete('/contacts/:contactId/',isValidId, ctrlWrapper(deleteContactController));
router.patch(
  '/contacts/:contactId/',isValidId, validateBody(updateContactSchema),
  jsonParser, upload.single("avatar"),
  ctrlWrapper(patchContactController),
);

export default router;