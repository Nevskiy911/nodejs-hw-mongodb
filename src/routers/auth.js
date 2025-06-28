import { Router } from 'express';
import {
  loginUserController,
  registerUserController,
} from '../controllers/auth';
import { validateBody } from '../middlewares/validateBody';
import { registerUserSchema } from '../validation/register-user-schema';
import { loginUserSchema } from '../validation/login-user-schema';

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
authRouter.post('/auth/logout');
authRouter.post('/auth/refresh-session');

export default authRouter;
