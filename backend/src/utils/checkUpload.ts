import { Request, Response, NextFunction } from 'express';
import fs from 'fs/promises';
import path from 'path';

const UPLOAD = path.join(__dirname, '..', '..', 'uploads');
const PROFILE = path.join(__dirname, '..', '..', 'uploads', 'profile-pictures');
const GROUP = path.join(__dirname, '..', '..', 'uploads', 'group-pictures');
const MESSAGE_FILES = path.join(
  __dirname,
  '..',
  '..',
  'uploads',
  'message-attachments'
);

export const checkFolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if upload folder exists
    await fs.access(UPLOAD);
    // Upload folder exists, call next middleware
    next();
  } catch (err) {
    // Upload folder does not exist, create it
    try {
      await fs.mkdir(UPLOAD);
      await fs.mkdir(PROFILE);
      await fs.mkdir(GROUP);
      await fs.mkdir(MESSAGE_FILES);
      next();
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
};
