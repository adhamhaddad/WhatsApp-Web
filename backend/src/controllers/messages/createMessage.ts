import { Request, Response } from 'express';
import Message from '../../models/message';
import { io } from '../../server';

const message = new Message();

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { image_url, file_url } = req.body;
    const requestData = { ...req.body };

    if (file_url === 'null') {
      requestData['file_url'] = [];
    }
    if (image_url === 'null') {
      requestData['image_url'] = [];
    }

    const response = await message.createMessage(requestData);
    io.emit('messages', { action: 'CREATE', data: response });
    res.status(201).json({ data: response });
  } catch (error) {
    res.status(400).json({ errors: (error as Error).message });
  }
};
