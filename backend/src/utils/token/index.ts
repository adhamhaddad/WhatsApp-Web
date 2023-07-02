import { setAccessToken } from './setAccessToken';
import { setRefreshToken } from './setRefreshToken';
import { verifyAccessToken } from './verifyAccessToken';
import { verifyRefreshToken } from './verifyRefreshToken';
import { authMe } from './authMe';

interface Payload {
  id: string;
  name: string;
  phone_number: string;
}
interface DecodedToken {
  id: string;
  name?: string;
  phone_number?: string;
}

export {
  setAccessToken,
  setRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  authMe,
  Payload,
  DecodedToken
};
