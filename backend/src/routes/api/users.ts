import { Router } from 'express';
import {
  validateGetUser,
  validateUpdateUser,
  validateDeleteUser
} from '../../middlewares/validation/users';
import { getUser, updateUser, deleteUser } from '../../controllers/users';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .get('/:id', validateGetUser, verifyToken, getUser)
  .patch('/:id', validateUpdateUser, verifyToken, updateUser)
  .delete('/:id', validateDeleteUser, verifyToken, deleteUser);

export default router;
