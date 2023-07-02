import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { validate } from '../validationResult';

export const validateGetMessages = [
  check('conversation_id')
    .exists()
    .withMessage('conversation_id is missing from the parameters')
    .notEmpty()
    .withMessage('conversation_id is empty'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
