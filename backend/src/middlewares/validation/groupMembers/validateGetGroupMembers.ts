import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { validate } from '../validationResult';

export const validateGetGroupMembers = [
  check('group_id')
    .exists()
    .withMessage('group_id is missing from the parameters')
    .notEmpty()
    .withMessage('group_id is empty'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
