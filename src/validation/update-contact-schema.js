import Joi from 'joi';
import { CONTACT_TYPE } from '../constants/contactType.js';

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().min(3).max(20).email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.valid(...Object.values(CONTACT_TYPE)),
});
