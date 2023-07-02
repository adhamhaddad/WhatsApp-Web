import { Router } from 'express';
import {
  validateCreateGroupMember,
  validateGetGroupMembers,
  validateUpdateGroupMember,
  validateDeleteGroupMember
} from '../../middlewares/validation/groupMembers';
import {
  createGroupMember,
  getGroupMembers,
  updateGroupMember,
  deleteGroupMember
} from '../../controllers/groupMembers';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/', validateCreateGroupMember, verifyToken, createGroupMember)
  .get('/:group_id', validateGetGroupMembers, verifyToken, getGroupMembers)
  .patch('/:id', validateUpdateGroupMember, verifyToken, updateGroupMember)
  .delete('/:id', validateDeleteGroupMember, verifyToken, deleteGroupMember);

export default router;
