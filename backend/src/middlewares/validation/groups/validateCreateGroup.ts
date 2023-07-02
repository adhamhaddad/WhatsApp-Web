import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateGroup = [
  body('icon_url').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('File is required');
    }
    return true;
  }),
  body('name')
    .exists()
    .withMessage("Group Name does'nt exists in the body.")
    .notEmpty()
    .withMessage('Group Name is empty')
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('Group Name must be at least 1 and maximum 50 letters'),
  body('user_id')
    .exists()
    .withMessage('user_id is missing from the body')
    .notEmpty()
    .withMessage('user_id is empty')
    .isNumeric()
    .withMessage('user_id must be a number'),
  body('members')
    .exists()
    .withMessage('members is missing from the body')
    .notEmpty()
    .withMessage('members is empty'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
