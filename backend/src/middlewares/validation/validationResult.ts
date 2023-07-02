import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorArray = errors
      .array()
      .map((error) => ({ [error.param]: error.msg }));
    return res.status(422).json({ errors: errorArray });
  }
  next();
};
