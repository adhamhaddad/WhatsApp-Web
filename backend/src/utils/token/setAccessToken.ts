import jwt, { SignOptions } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import configs from '../../configs';
import { redisClient } from '../../database';
import { Payload } from '.';

const privateAccessKey = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'keys',
  'accessToken',
  'private.key'
);

export const setAccessToken = async (payload: Payload): Promise<string> => {
  try {
    const privateKey = await fs.promises.readFile(privateAccessKey, 'utf8');
    const options: SignOptions = {
      algorithm: 'RS256',
      expiresIn: configs.access_expires,
      issuer: 'Nodejs-Refresh-Token',
      audience: `user_id-${payload.id}`,
      subject: 'access_token'
    };
    const token = jwt.sign(payload, privateKey, options);
    await redisClient.set(`access_token:${payload.id}`, token, {
      EX: configs.access_expires
    });
    return token;
  } catch (err) {
    throw new Error('Failed to sign JWT');
  }
};
