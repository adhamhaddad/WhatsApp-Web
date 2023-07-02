import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateUser = [
  body('name')
    .exists()
    .withMessage("Name does'nt exists in the body.")
    .notEmpty()
    .withMessage('Name is empty')
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('Name must be at least 1 and maximum 50 letters'),
  body('phone_number')
    .exists()
    .withMessage('Phone Number is missing from the body')
    .notEmpty()
    .withMessage('Phone Number is empty')
    .isMobilePhone('ar-EG')
    .withMessage('Phone Number is not valid'),
  body('password')
    .exists()
    .withMessage('Password is missing from the body')
    .notEmpty()
    .withMessage('Password is empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
