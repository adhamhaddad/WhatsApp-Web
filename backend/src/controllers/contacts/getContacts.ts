import { Request, Response } from 'express';
import Contact from '../../models/contact';

const contact = new Contact();

export const getContacts = async (req: Request, res: Response) => {
  try {
    const response = await contact.getContacts(req.params.user_id);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
