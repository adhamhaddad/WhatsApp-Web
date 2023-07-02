import { Request, Response, NextFunction } from 'express';
import { check, body } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdateMessage = [
  check('id')
    .exists()
    .withMessage('id is missing from the parameters')
    .notEmpty()
    .withMessage('id is empty'),
  body('message')
    .exists()
    .withMessage("Message does'nt exists in the body.")
    .notEmpty()
    .withMessage('Message is empty')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Message must be at least 1 letters'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
