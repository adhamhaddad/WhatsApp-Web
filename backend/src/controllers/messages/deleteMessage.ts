import { Request, Response } from 'express';
import Message from '../../models/message';
import { io } from '../../server';

const message = new Message();

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const response = await message.deleteMessage(req.params.id);
    io.emit('messages', { action: 'DELETE', data: response });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ errors: (error as Error).message });
  }
};
