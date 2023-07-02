import { Request as ExpressRequest, Response } from 'express';
import Message from '../../models/message';
import { DecodedToken } from '../../utils/token';

interface Request extends ExpressRequest {
  user?: DecodedToken;
}
const message = new Message();

export const getMessages = async (req: Request, res: Response) => {
  try {
    const user_id = req.user?.id as unknown as number;
    const response = await message.getMessages(
      req.params.conversation_id,
      user_id
    );
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ errors: (error as Error).message });
  }
};
