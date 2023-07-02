import { Request, Response } from 'express';
import About from '../../models/about';

const about = new About();

export const getAbout = async (req: Request, res: Response) => {
  try {
    const response = await about.getAbout(req.params.user_id);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ errors: (error as Error).message });
  }
};
