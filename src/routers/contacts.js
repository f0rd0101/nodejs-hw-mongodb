import express from 'express';
import {ctrlWrapper} from '../utils/ctrlWrapper.js';
import {
getAllContactsController,
getContactByIdController,
createContactController,
deleteContactController,
patchContactController,
} from '../controllers/contacts.js';



const router = express.Router();
const jsonParser = express.json();

router.get('/',ctrlWrapper(getAllContactsController));
router.get('/:contactId',ctrlWrapper(getContactByIdController));
router.post('/', jsonParser,ctrlWrapper(createContactController));
router.delete('/:contactId',ctrlWrapper(deleteContactController));
router.patch('/:contactId',jsonParser,ctrlWrapper(patchContactController));


export default router;