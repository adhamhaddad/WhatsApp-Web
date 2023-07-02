import { Request, Response } from 'express';
import Auth from '../../models/auth';

const auth = new Auth();

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const response = await auth.updatePassword(req.params.id, req.body);
    res.status(204).json({ data: response });
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message
    });
  }
};
