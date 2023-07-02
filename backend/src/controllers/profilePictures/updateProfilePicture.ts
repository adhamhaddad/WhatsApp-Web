import { Request, Response } from 'express';
import ProfilePicture from '../../models/profilePictures';

const profilePicture = new ProfilePicture();

export const updateProfilePicture = async (req: Request, res: Response) => {
  try {
    const response = await profilePicture.updateProfilePicture(
      req.params.id,
      req.file?.path as string
    );
    res.status(203).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
