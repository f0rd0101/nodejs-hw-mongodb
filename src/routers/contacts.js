import express from 'express';
import {ctrlWrapper} from '../utils/ctrlWrapper.js';
import {
getAllContactsController,
getContactByIdController
} from '../controllers/contacts.js';



const router = express.Router();

router.get('/',ctrlWrapper(getAllContactsController));
router.get('/:contactId',ctrlWrapper(getContactByIdController));


  export default router;