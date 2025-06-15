import { initMongoDbConnection } from '../db/initMongoDbConnection.js';
import { setupServer } from '../server.js';

await initMongoDbConnection();
setupServer();
