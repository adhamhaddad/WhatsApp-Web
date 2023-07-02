import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateChat = [
  body('user_id')
    .exists()
    .withMessage('user_id is missing from the body')
    .notEmpty()
    .withMessage('user_id is empty')
    .isNumeric()
    .withMessage('user_id must be a number'),
  body('participant_id')
    .exists()
    .withMessage('participant_id is missing from the body')
    .notEmpty()
    .withMessage('participant_id is empty')
    .custom((value) => {
      try {
        const parsedValue = JSON.parse(value);
        return Array.isArray(parsedValue);
      } catch (error) {
        return false;
      }
    })
    .withMessage('participant_id must be an array'),
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
