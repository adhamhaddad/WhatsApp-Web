import { Request, Response } from 'express';
import BlockedContact from '../../models/blockedContact';

const blockedContact = new BlockedContact();

export const getBlockContacts = async (req: Request, res: Response) => {
  try {
    const response = await blockedContact.getBlockContacts(req.params.user_id);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ errors: (error as Error).message });
  }
};
