import Joi from 'joi';
import { CONTACT_TYPE } from '../constants/contactType.js';
import { isValidObjectId } from 'mongoose';

export const createContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(20).email().optional(),
  isFavourite: Joi.string().valid('true', 'false').optional(),
  contactType: Joi.optional()
    .valid(...Object.values(CONTACT_TYPE))
    .default('personal'),
  userId: Joi.string().custom((value, helper) => {
    if (!isValidObjectId(value)) {
      return helper.message('Not valid mongo objectId');
    }

    return value;
  }),
});
