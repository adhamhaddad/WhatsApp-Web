import { Request, Response } from 'express';
import Message from '../../models/message';
import { io } from '../../server';

const message = new Message();

export const updateMessage = async (req: Request, res: Response) => {
  try {
    const response = await message.updateMessage(req.params.id, req.body);
    io.emit('messages', { action: 'UPDATE', data: response });
    res.status(203).json({ data: response });
  } catch (error) {
    res.status(400).json({ errors: (error as Error).message });
  }
};
