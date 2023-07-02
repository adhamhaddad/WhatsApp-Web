import { Request as ExpressRequest, Response } from 'express';
import {
  verifyRefreshToken,
  setAccessToken,
  setRefreshToken
} from '../../utils/token';
import configs from '../../configs';
import { DecodedToken } from '../../utils/token';

interface Request extends ExpressRequest {
  user?: DecodedToken;
}

export const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshToken: token } = req.body;
  try {
    // Verify the refresh token
    const decoded = await verifyRefreshToken(token);
    // Generate a new access and refresh tokens
    const { id, name, phone_number } = decoded;
    const accessToken = await setAccessToken({
      id,
      name,
      phone_number
    });
    const refreshToken = await setRefreshToken({
      id,
      name,
      phone_number
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: configs.access_expires
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: configs.refresh_expires
    });

    res.status(200).json({
      data: { accessToken }
    });
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
};
