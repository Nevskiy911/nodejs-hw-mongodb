import { initMongoDbConnection } from '../db/initMongoDbConnection.js';
import { setupServer } from '../server.js';
import { getEnvVar } from './getEnvVar.js';
import { ENV_VARS } from '../constants/envVars.js';

const PORT = getEnvVar(ENV_VARS.PORT) || 3000;

const startServer = async () => {
  try {
    await initMongoDbConnection();
    const app = setupServer();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
