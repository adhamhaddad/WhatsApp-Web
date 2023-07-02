import { Request, Response } from 'express';
import Chat from '../../models/chat';
import { io } from '../../server';

const chat = new Chat();

export const createChat = async (req: Request, res: Response) => {
  try {
    const { image_url, file_url, participant_id } = req.body;

    const requestData = {
      ...req.body,
      participant_id: JSON.parse(participant_id)
    };
    
    if (file_url === 'null') {
      requestData['file_url'] = [];
    }
    if (image_url === 'null') {
      requestData['image_url'] = [];
    }

    const response = await chat.createChat(requestData);
    io.emit('chats', { action: 'CREATE', data: response });
    res.status(201).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
