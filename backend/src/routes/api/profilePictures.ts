import { Router } from 'express';
import {
  validateCreateProfilePicture,
  validateGetProfilePicture,
  validateUpdateProfilePicture,
  validateDeleteProfilePicture
} from '../../middlewares/validation/profilePictures';
import {
  createProfilePicture,
  getProfilePicture,
  updateProfilePicture,
  deleteProfilePicture
} from '../../controllers/profilePictures';
import { verifyToken } from '../../middlewares/verifyToken';
import { checkFolder } from '../../utils/checkUpload';
import { profile } from '../../utils/multer';

const router = Router();

router
  .post(
    '/',
    verifyToken,
    checkFolder,
    profile,
    validateCreateProfilePicture,
    createProfilePicture
  )
  .patch(
    '/:id',
    verifyToken,
    checkFolder,
    profile,
    validateUpdateProfilePicture,
    updateProfilePicture
  )
  .get('/:user_id', validateGetProfilePicture, verifyToken, getProfilePicture)
  .delete(
    '/:id',
    validateDeleteProfilePicture,
    verifyToken,
    deleteProfilePicture
  );

export default router;
