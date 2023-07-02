import { Request, Response, NextFunction } from 'express';
import { check, body } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdateAbout = [
  check('id')
    .exists()
    .withMessage('id is missing from the parameters')
    .notEmpty()
    .withMessage('id is empty'),
  body('about')
    .exists()
    .withMessage("About does'nt exists in the body.")
    .notEmpty()
    .withMessage('About is empty')
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('About must be at least 1 and maximum 50 letters'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
