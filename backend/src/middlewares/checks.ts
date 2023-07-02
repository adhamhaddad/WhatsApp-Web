import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const PROFILE_PIC = path.join(
  __dirname,
  '..',
  '..',
  'uploads/profile-pictures'
);
const GROUP_PIC = path.join(__dirname, '..', '..', 'uploads/group-pictures');

export const checkProfile = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  fs.access(PROFILE_PIC, (err) => {
    if (err) {
      fs.mkdir(path.join(__dirname, '..', '..', 'uploads'), (err) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: err
          });
        }
        fs.mkdir(PROFILE_PIC, (err) => {
          if (err) {
            return res.status(500).json({
              status: false,
              message: err
            });
          }
          next();
        });
      });
    }
  });
};

export const checkGroup = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  fs.access(GROUP_PIC, (err) => {
    if (err) {
      fs.mkdir(path.join(__dirname, '..', '..', 'uploads'), (err) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: err
          });
        }
        fs.mkdir(GROUP_PIC, (err) => {
          if (err) {
            return res.status(500).json({
              status: false,
              message: err
            });
          }
          next();
        });
      });
    }
  });
};
