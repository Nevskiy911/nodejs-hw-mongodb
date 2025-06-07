import express from 'express';
import { randomUUID } from 'node:crypto';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';
import { Contact } from './db/models/contact.js';
import mongoose from 'mongoose';

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

  app.get('/contacts', async (req, res, next) => {
    try {
      const contacts = await Contact.find({});
      console.log(contacts);
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (err) {
      next(err);
    }
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    try {
      const { contactId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(contactId)) {
        return res.status(404).json({ message: 'Contact not found' });
      }

      const contact = await Contact.findById(contactId);

      if (!contact) {
        return res
          .status(404)
          .json({ message: `Contact ${contactId} not found` });
      }

      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  });

  app.use((error, req, res, next) => {
    res.status(500).json({
      errorMessage: error.message,
      id: req.id,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not Found',
      status: 404,
      meta: {},
    });
  });

  const PORT = getEnvVar(ENV_VARS.PORT) || 3000;

  app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
  });
};
