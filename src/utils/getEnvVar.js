import 'dotenv/config';

export const getEnvVar = (name, defaultValue) => {
  if (!name) {
    throw new Error(`getEnvVar was called with undefined or empty name`);
  }

  const envVar = process.env[name];

  if (envVar) {
    return envVar;
  }

  if (!envVar && defaultValue) {
    return defaultValue;
  }

  throw new Error(`Env var ${name} should be provided`);
};
