import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateLogin = [
  body('phone_number')
    .exists()
    .withMessage('Phone Number is missing from the body')
    .notEmpty()
    .withMessage('Phone Number is empty')
    .isMobilePhone('ar-EG')
    .withMessage('Phone Number is not valid'),
  body('password')
    .exists()
    .withMessage('password is missing from the body')
    .notEmpty()
    .withMessage('password is empty')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
