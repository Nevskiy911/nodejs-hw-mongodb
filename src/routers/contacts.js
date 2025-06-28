import express from 'express';
import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  patchContact,
  putContact,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateMongoDBId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/create-contact-schema.js';
import { updateContactSchema } from '../validation/update-contact-schema.js';

const contactsRouter = express.Router();

contactsRouter.use('contacts/:contactId', validateMongoDBId('contactId'));

contactsRouter.get('/contacts', ctrlWrapper(getAllContacts));
contactsRouter.get('/contacts/:contactId', ctrlWrapper(getContactById));
contactsRouter.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContact),
);
contactsRouter.put(
  '/contacts/:contactId',
  validateBody(createContactSchema),
  ctrlWrapper(putContact),
);
contactsRouter.patch(
  'contacts/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContact),
);
contactsRouter.delete('/contacts/:contactId', ctrlWrapper(deleteContact));

export default contactsRouter;
