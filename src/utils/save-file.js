import fs from 'node:fs/promises';
import path from 'node:path';
import { PERMANENT_UPLOAD_DIR } from '../constants/paths.js';

export const saveFile = async (file) => {
  const newPath = path.join(PERMANENT_UPLOAD_DIR, file.filename);
  await fs.rename(file.path, newPath);
};
