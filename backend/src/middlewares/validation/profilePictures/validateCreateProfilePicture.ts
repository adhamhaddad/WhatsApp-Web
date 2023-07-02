import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateProfilePicture = [
  body('image_url').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('File is required');
    }
    return true;
  }),
  body('user_id')
    .exists()
    .withMessage('user_id is missing from the body')
    .notEmpty()
    .withMessage('user_id is empty')
    .isNumeric()
    .withMessage('user_id must be a number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
