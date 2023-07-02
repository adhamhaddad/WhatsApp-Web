import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { redisClient } from '../../database';
import { Payload } from '.';

const publicRefreshKey = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'keys',
  'refreshToken',
  'public.key'
);

export const verifyRefreshToken = async (token: string): Promise<Payload> => {
  try {
    const publicKey = await fs.promises.readFile(publicRefreshKey, 'utf8');
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
      issuer: 'Nodejs-Refresh-Token'
    }) as Payload;
    const cachedToken = await redisClient.get(`refresh_token:${decoded.id}`);
    if (!cachedToken || cachedToken !== token) {
      throw new Error('Refresh token not found or expired');
    }
    return decoded;
  } catch (err) {
    throw new Error(`Failed to verify JWT: ${(err as Error).message}`);
  }
};
