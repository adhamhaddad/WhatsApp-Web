import { Request, Response, NextFunction } from 'express';
import { check, body } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdateGroupMember = [
  check('user_id')
    .exists()
    .withMessage('user_id is missing from the parameters')
    .notEmpty()
    .withMessage('user_id is empty'),
  body('user_role')
    .exists()
    .withMessage('user_role is missing from the body')
    .notEmpty()
    .withMessage('user_role is empty')
    .isNumeric()
    .withMessage('user_role must be a number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
