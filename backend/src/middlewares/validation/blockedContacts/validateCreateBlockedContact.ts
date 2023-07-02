import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateBlockedContact = [
  body('user_id')
    .exists()
    .withMessage('user_id is missing from the body')
    .notEmpty()
    .withMessage('user_id is empty')
    .isNumeric()
    .withMessage('user_id must be a number'),
  body('contact_id')
    .exists()
    .withMessage('contact_id is missing from the body')
    .notEmpty()
    .withMessage('contact_id is empty')
    .isNumeric()
    .withMessage('contact_id must be a number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
