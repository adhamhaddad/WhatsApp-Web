import { Request, Response, NextFunction } from 'express';
import { check, body } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdateGroup = [
  check('id')
    .exists()
    .withMessage('id is missing from the parameters')
    .notEmpty()
    .withMessage('id is empty'),
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
    .isLength({ min: 5, max: 50 })
    .withMessage('Group Name must be at least 5 and maximum 50 letters'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
