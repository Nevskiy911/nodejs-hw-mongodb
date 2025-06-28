import express from 'express';
import { randomUUID } from 'node:crypto';
import pino from 'pino-http';
import cors from 'cors';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';

export const setupServer = () => {
  const app = express();

  app.use(cors(), pino(), cookieParser(), requestIdMiddleware);
  app.use(
    express.json({
      type: ['application/json', 'aplication/vnd.api+json'],
      limit: '100kb',
    }),
  );

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

  app.use(notFoundHandler);

  app.use(errorHandler);

  return app;
};
