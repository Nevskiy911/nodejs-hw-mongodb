import Joi from 'joi';

export const authorizeWithGoogleOAuthSchema = Joi.object({
  code: Joi.string().required(),
});
