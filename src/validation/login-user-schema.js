import Joi from 'joi';

export const loginUserSchema = Joi.object({
  email: Joi.string().email().optional(),
  password: Joi.string().required().min(8),
});
