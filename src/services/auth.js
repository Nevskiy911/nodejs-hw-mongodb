import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { User } from '../db/models/user';
import { Session } from '../db/models/session';

export const registerUser = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw createHttpError(409, 'User had already registered!');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const user = await User.create({ ...payload, password: hashedPassword });

  return user;
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(401, 'User login and password does not match!');
  }

  const arePasswordsEqual = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!arePasswordsEqual) {
    throw createHttpError(401, 'User login and password does not match!');
  }

  await Session.findOneAndDelete({ userId: user._id });

  const session = await Session.create({
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + 1000 * 60 * 15),
    refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    userId: user._id,
  });

  return session;
};
