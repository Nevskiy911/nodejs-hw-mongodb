import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/register-user-schema.js';
import { loginUserSchema } from '../validation/login-user-schema.js';

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
authRouter.post('/auth/refresh-session', refreshSessionController);

export default authRouter;
