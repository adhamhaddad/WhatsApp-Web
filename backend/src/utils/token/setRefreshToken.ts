import jwt, { SignOptions } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import configs from '../../configs';
import { redisClient } from '../../database';
import { Payload } from '.';

const privateRefreshKey = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'keys',
  'refreshToken',
  'private.key'
);

export const setRefreshToken = async (payload: Payload): Promise<string> => {
  try {
    const privateKey = await fs.promises.readFile(privateRefreshKey, 'utf8');
    const options: SignOptions = {
      algorithm: 'RS256',
      expiresIn: configs.refresh_expires,
      issuer: 'Nodejs-Refresh-Token',
      audience: `user_id-${payload.id}`,
      subject: 'refresh_token'
    };
    const token = jwt.sign(payload, privateKey, options);
    await redisClient.set(`refresh_token:${payload.id}`, token, {
      EX: configs.refresh_expires
    });
    return token;
  } catch (err) {
    throw new Error('Failed to sign JWT');
  }
};
