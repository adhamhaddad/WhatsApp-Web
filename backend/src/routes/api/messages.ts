import { Router } from 'express';
import {
  validateCreateMessage,
  validateGetMessages,
  validateUpdateMessage,
  validateDeleteMessage
} from '../../middlewares/validation/messages';
import {
  createMessage,
  getMessages,
  updateMessage,
  deleteMessage
} from '../../controllers/messages';
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
    validateCreateMessage,
    createMessage
  )
  .get('/:conversation_id', validateGetMessages, verifyToken, getMessages)
  .patch('/:id', validateUpdateMessage, verifyToken, updateMessage)
  .delete('/:id', validateDeleteMessage, verifyToken, deleteMessage);

export default router;
