import 'dotenv/config';
import createHttpError from 'http-errors';

export const getEnvVar = (name, defaultValue) => {
  if (!name) {
    throw createHttpError(`getEnvVar was called with undefined or empty name`);
  }

  const envVar = process.env[name];

  if (envVar) {
    return envVar;
  }

  if (!envVar && defaultValue) {
    return defaultValue;
  }
};
