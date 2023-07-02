import { Request, Response, NextFunction } from 'express';
import { check, body } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdateUser = [
  check('id')
    .exists()
    .withMessage('id is missing from the parameters')
    .notEmpty()
    .withMessage('id is empty'),
  body('name')
    .exists()
    .withMessage("Name does'nt exists in the body.")
    .notEmpty()
    .withMessage('Name is empty')
    .isString()
    .isLength({ min: 5, max: 50 })
    .withMessage('Name must be at least 5 and maximum 50 letters'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
