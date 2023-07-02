import { Router } from 'express';
import {
  validateCreateGroup,
  validateGetGroups,
  validateGetGroup,
  validateUpdateGroup,
  validateDeleteGroup
} from '../../middlewares/validation/groups';
import {
  createGroup,
  getGroups,
  getGroup,
  updateGroup,
  deleteGroup
} from '../../controllers/groups';
import { verifyToken } from '../../middlewares/verifyToken';
import { group } from '../../utils/multer';
import { checkFolder } from '../../utils/checkUpload';

const router = Router();

router
  .post('/', verifyToken, checkFolder, group, validateCreateGroup, createGroup)
  .get('/:user_chat_id', validateGetGroup, verifyToken, getGroup)
  .patch('/:id', group, validateUpdateGroup, verifyToken, updateGroup)
  .delete('/:id', validateDeleteGroup, verifyToken, deleteGroup);

export default router;
