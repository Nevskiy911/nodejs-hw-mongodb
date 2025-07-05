import express from 'express';
import {
  getAllContacts,
  createContact,
  deleteContact,
  patchContact,
  putContact,
  getOneContact,
  uploadContactPhoto,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateMongoDBId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/create-contact-schema.js';
import { updateContactSchema } from '../validation/update-contact-schema.js';
import { authenticate } from '../middlewares/authenticate-middleware.js';
import { checkRoles } from '../middlewares/check-roles-middleware.js';
import { upload } from '../middlewares/upload-files.js';

const contactsRouter = express.Router();
contactsRouter.use('/contacts', authenticate);

contactsRouter.use(
  '/contacts/:contactId',
  validateMongoDBId('contactId'),
  checkRoles,
);

contactsRouter.get('/contacts', ctrlWrapper(getAllContacts));
contactsRouter.get('/contacts/:contactId', ctrlWrapper(getOneContact));
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
  '/contacts/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContact),
);
contactsRouter.post(
  '/contacts/:contactId/upload-photo',
  upload.single('photoUrl'),
  ctrlWrapper(uploadContactPhoto),
);
contactsRouter.delete('/contacts/:contactId', ctrlWrapper(deleteContact));

export default contactsRouter;
