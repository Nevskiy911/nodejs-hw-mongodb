import Joi from 'joi';

export const requestResetPasswordEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});
