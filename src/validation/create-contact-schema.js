import Joi from 'joi';
import { CONTACT_TYPE } from '../constants/contactType.js';

export const createContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(20).email().optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.optional()
    .valid(...Object.values(CONTACT_TYPE))
    .default('personal'),
});
