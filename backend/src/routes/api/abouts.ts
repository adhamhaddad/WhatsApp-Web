import { Router } from 'express';
import {
  validateGetAbout,
  validateUpdateAbout
} from '../../middlewares/validation/abouts';
import { getAbout, updateAbout } from '../../controllers/abouts';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .get('/:user_id', validateGetAbout, verifyToken, getAbout)
  .patch('/:id', validateUpdateAbout, verifyToken, updateAbout);

export default router;
