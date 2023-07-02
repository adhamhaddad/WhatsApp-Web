import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateMessage = [
  body('conversation_id')
    .exists()
    .withMessage('conversation_id is missing from the body')
    .notEmpty()
    .withMessage('conversation_id is empty')
    .isNumeric()
    .withMessage('conversation_id must be a number'),
  body('user_id')
    .exists()
    .withMessage('user_id is missing from the body')
    .notEmpty()
    .withMessage('user_id is empty')
    .isNumeric()
    .withMessage('user_id must be a number'),
  body('message')
    .exists()
    .withMessage("Message does'nt exists in the body.")
    .notEmpty()
    .withMessage('Message is empty')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Message must be at least 1 letters'),
  body('file_url').custom((value, { req }) => {
    if (!value && !req.file) {
      return true;
    }
    return true;
  }),
  body('image_url').custom((value, { req }) => {
    if (!value && !req.file) {
      return true;
    }
    return true;
  }),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
