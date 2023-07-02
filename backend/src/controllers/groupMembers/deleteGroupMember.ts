import { Request, Response } from 'express';
import GroupMember from '../../models/groupMember';

const groupMember = new GroupMember();

export const deleteGroupMember = async (req: Request, res: Response) => {
  try {
    const response = await groupMember.deleteGroupMember(req.params.id);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
