import { Request, Response } from 'express';
import User from '../../models/user';
import { setAccessToken, setRefreshToken } from '../../utils/token';

const user = new User();

export const createUser = async (req: Request, res: Response) => {
  try {
    const response = await user.createUser(req.body);
    const accessToken = await setAccessToken(response);
    const refreshToken = await setRefreshToken(response);
    res.status(201).json({
      status: true,
      data: { user: { ...response }, tokens: { accessToken, refreshToken } },
      message: 'User created successfully.'
    });
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message
    });
  }
};
