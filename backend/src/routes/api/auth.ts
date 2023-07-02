import { Router } from 'express';
import {
  validateRegister,
  validateLogin,
  validateUpdatePassword
} from '../../middlewares/validation/auth';
import {
  createUser,
  authUser,
  authMe,
  refreshAccessToken,
  updatePassword
} from '../../controllers/auth';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/register', validateRegister, createUser)
  .post('/login', validateLogin, authUser)
  .patch('/reset-password', validateUpdatePassword, verifyToken, updatePassword)
  .post('/refresh-token', refreshAccessToken)
  .get('/auth-me', authMe);

export default router;
