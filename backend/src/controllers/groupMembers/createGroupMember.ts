import { Request, Response } from 'express';
import GroupMember from '../../models/groupMember';

const groupMember = new GroupMember();

export const createGroupMember = async (req: Request, res: Response) => {
  try {
    const response = await groupMember.createGroupMember(req.body);
    res.status(201).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
