import { Request, Response } from 'express';
import Group from '../../models/group';

const group = new Group();

export const createGroup = async (req: Request, res: Response) => {
  try {
    return;
    // const response = await group.createGroup(req.body);
    // res.status(201).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
