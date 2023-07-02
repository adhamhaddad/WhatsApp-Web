import { Request, Response } from 'express';
import Contact from '../../models/contact';

const contact = new Contact();

export const createContact = async (req: Request, res: Response) => {
  try {
    const response = await contact.createContact(req.body);
    res.status(201).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
