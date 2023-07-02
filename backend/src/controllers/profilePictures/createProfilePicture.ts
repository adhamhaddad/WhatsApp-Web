import { Request, Response } from 'express';
import ProfilePicture from '../../models/profilePictures';

const profilePicture = new ProfilePicture();

export const createProfilePicture = async (req: Request, res: Response) => {
  try {
    const response = await profilePicture.createProfilePicture({
      ...req.body,
      image_url: req.file?.path
    });
    res.status(201).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
