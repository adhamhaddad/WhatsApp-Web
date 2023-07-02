import { Request, Response, NextFunction } from 'express';
import { check, body } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdateContact = [
  check('id')
    .exists()
    .withMessage('id is missing from the parameters')
    .notEmpty()
    .withMessage('id is empty'),
  body('phone_number')
    .exists()
    .withMessage('Phone Number is missing from the body')
    .notEmpty()
    .withMessage('Phone Number is empty')
    .isMobilePhone('ar-EG')
    .withMessage('Phone Number is not valid'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
