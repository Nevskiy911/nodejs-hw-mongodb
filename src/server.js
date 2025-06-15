import express from 'express';
import { randomUUID } from 'node:crypto';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use((req, res, next) => {
    req.id = randomUUID();
    next();
  });

  app.use('/contacts', contactsRouter);

  app.use(errorHandler);

  app.use(notFoundHandler);

  const PORT = getEnvVar(ENV_VARS.PORT) || 3000;

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};
