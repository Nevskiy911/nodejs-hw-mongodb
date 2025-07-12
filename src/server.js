import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { requestIdMiddleware } from './middlewares/requestId.js';
import router from './routers/index.js';
import { PERMANENT_UPLOAD_DIR } from './constants/paths.js';
import { setupSwagger } from './middlewares/swagger.js';

export const setupServer = () => {
  const app = express();

  app.use(cors(), pino(), cookieParser(), requestIdMiddleware);
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
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

  app.use('/api-docs', setupSwagger());

  app.use('/uploads', express.static(PERMANENT_UPLOAD_DIR));

  app.use('/', router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  return app;
};
