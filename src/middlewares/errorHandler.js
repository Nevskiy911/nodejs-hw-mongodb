import { isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

export const errorHandler = (error, req, res, next) => {
  if (error.isJoi) {
    return res.status(400).json({
      status: 400,
      errorMassage: 'Validation Error',
      id: req.id,
      details: error.details.map((path, message) => ({
        path,
        message,
      })),
    });
  }
  if (isHttpError(error)) {
    return res.status(error.status).json({
      status: error.status,
      errorMassage: error.message,
      id: req.id,
    });
  }

  if (error instanceof MongooseError) {
    return res.status(500).json({
      status: 500,
      errorMassage: 'MongoDB error!',
      id: req.id,
      details: error.message,
    });
  }
  res.status(500).json({
    status: 500,
    errorMassage: error.message,
    id: req.id,
  });
};
