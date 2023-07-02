import { Request, Response } from 'express';
import Group from '../../models/group';

const group = new Group();

export const getGroup = async (req: Request, res: Response) => {
  try {
    const response = await group.getGroup(req.params.id);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
