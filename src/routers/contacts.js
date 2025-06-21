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

const router = express.Router();

router.use('/:contactId', validateMongoDBId('contactId'));

router.get('/', ctrlWrapper(getAllContacts));
router.get('/:contactId', ctrlWrapper(getContactById));
router.post('/', validateBody(createContactSchema), ctrlWrapper(createContact));
router.put(
  '/:contactId',
  validateBody(createContactSchema),
  ctrlWrapper(putContact),
);
router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContact),
);
router.delete('/:contactId', ctrlWrapper(deleteContact));

export default router;
