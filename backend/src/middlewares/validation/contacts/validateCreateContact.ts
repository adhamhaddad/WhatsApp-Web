import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateContact = [
  body('user_id')
    .exists()
    .withMessage('user_id is missing from the body')
    .notEmpty()
    .withMessage('user_id is empty')
    .isNumeric()
    .withMessage('user_id must be a number'),
  body('phone_number')
    .exists()
    .withMessage('Phone Number is missing from the body')
    .notEmpty()
    .withMessage('Phone Number is empty')
    .isMobilePhone('ar-EG')
    .withMessage('Phone Number is not valid'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
