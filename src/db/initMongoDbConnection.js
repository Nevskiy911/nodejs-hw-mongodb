import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoDbConnection = async () => {
  const user = getEnvVar('MONGO_DB_USER');
  const password = getEnvVar('MONGO_DB_PASSWORD');
  const host = getEnvVar('MONGO_DB_HOST');
  const db = getEnvVar('MONGO_DB_DATABASE');

  const uri = `mongodb+srv://${user}:${password}@${host}/${db}?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    await mongoose.connect(uri);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
