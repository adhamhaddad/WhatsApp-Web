import { Router } from 'express';
import {
  validateCreateChat,
  validateGetChats,
  validateGetChat
} from '../../middlewares/validation/chats';
import { createChat, getChats, getChat } from '../../controllers/chats';
import { verifyToken } from '../../middlewares/verifyToken';
import { checkFolder } from '../../utils/checkUpload';
import { messageAttachments } from '../../utils/multer';

const router = Router();

router
  .post(
    '/',
    verifyToken,
    checkFolder,
    messageAttachments,
    validateCreateChat,
    createChat
  )
  .get('/:id', validateGetChat, verifyToken, getChat)
  .get('/all/:user_id', validateGetChats, verifyToken, getChats);

export default router;
