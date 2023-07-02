import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { validate } from '../validationResult';

export const validateDeleteUser = [
  check('id')
    .exists()
    .withMessage('id is missing from the parameters')
    .notEmpty()
    .withMessage('id is empty'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
