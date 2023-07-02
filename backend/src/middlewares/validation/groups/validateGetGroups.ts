import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { validate } from '../validationResult';

export const validateGetGroups = [
  check('user_chat_id')
    .exists()
    .withMessage('user_chat_id is missing from the parameters')
    .notEmpty()
    .withMessage('user_chat_id is empty'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
