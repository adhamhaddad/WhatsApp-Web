import { Request, Response } from 'express';
import ProfilePicture from '../../models/profilePictures';

const profilePicture = new ProfilePicture();

export const getProfilePicture = async (req: Request, res: Response) => {
  try {
    const response = await profilePicture.getProfilePicture(req.params.user_id);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
