import { Request, Response, NextFunction } from 'express';
import { check, body } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdateProfilePicture = [
  check('id')
    .exists()
    .withMessage('id is missing from the parameters')
    .notEmpty()
    .withMessage('id is empty'),
  body('image_url').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('File is required');
    }
    return true;
  }),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
