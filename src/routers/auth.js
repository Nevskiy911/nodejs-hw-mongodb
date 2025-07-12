import { Router } from 'express';
import {
  authorizeWithGoogleController,
  getGoogleOauthUrlController,
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
  requestResetPasswordEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/register-user-schema.js';
import { loginUserSchema } from '../validation/login-user-schema.js';
import { requestResetPasswordEmailSchema } from '../validation/request-reset-password-email-schema.js';
import { resetPasswordSchema } from '../validation/reset-password-schema.js';
import { authorizeWithGoogleOAuthSchema } from '../validation/authorize-with-google-oauth-schema.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  validateBody(registerUserSchema),
  registerUserController,
);
authRouter.post(
  '/auth/login',
  validateBody(loginUserSchema),
  loginUserController,
);
authRouter.post('/auth/logout', logoutUserController);
authRouter.post('/auth/refresh', refreshSessionController);

authRouter.post(
  '/auth/send-reset-email',
  validateBody(requestResetPasswordEmailSchema),
  requestResetPasswordEmailController,
);
authRouter.post(
  '/auth/reset-pwd',
  validateBody(resetPasswordSchema),
  resetPasswordController,
);
authRouter.post('/auth/get-google-oauth-link', getGoogleOauthUrlController);
authRouter.post(
  '/auth/authorize-with-google-oauth',
  validateBody(authorizeWithGoogleOAuthSchema),
  authorizeWithGoogleController,
);

export default authRouter;
