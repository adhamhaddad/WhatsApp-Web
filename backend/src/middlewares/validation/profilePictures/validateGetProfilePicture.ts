import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { validate } from '../validationResult';

export const validateGetProfilePicture = [
  check('user_id')
    .exists()
    .withMessage('user_id is missing from the parameters')
    .notEmpty()
    .withMessage('user_id is empty'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
