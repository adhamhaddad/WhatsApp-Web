import { Request, Response } from 'express';
import Chat from '../../models/chat';

const chat = new Chat();

export const getChat = async (req: Request, res: Response) => {
  try {
    const response = await chat.getChat(req.params.id);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
