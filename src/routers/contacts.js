import express from 'express';

import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controlers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';

const router = Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId',isValidId, ctrlWrapper(getContactByIdController));
router.post('/', validateBody(createContactSchema), jsonParser, ctrlWrapper(createContactController));
router.delete('/:contactId/',isValidId, ctrlWrapper(deleteContactController));
router.patch(
  '/:contactId/',isValidId, validateBody(updateContactSchema),
  jsonParser,
  ctrlWrapper(patchContactController),
);

export default router;