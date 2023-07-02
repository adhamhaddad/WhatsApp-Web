import { Request, Response } from 'express';
import BlockedContact from '../../models/blockedContact';

const blockedContact = new BlockedContact();

export const createBlockedContact = async (req: Request, res: Response) => {
  try {
    const response = await blockedContact.createBlockContact(req.body);
    res.status(201).json({ data: response });
  } catch (error) {
    res.status(400).json({ errors: (error as Error).message });
  }
};
