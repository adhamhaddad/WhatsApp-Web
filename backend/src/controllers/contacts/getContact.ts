import { Request, Response } from 'express';
import Contact from '../../models/contact';

const contact = new Contact();

export const getContact = async (req: Request, res: Response) => {
  try {
    const response = await contact.getContact(req.params.id);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
