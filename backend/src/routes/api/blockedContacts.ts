import { Router } from 'express';
import {
  validateCreateBlockedContact,
  validateGetBlockedContacts,
  validateDeleteBlockedContact
} from '../../middlewares/validation/blockedContacts';
import {
  createBlockedContact,
  getBlockContacts,
  deleteBlockContact
} from '../../controllers/blockedContacts';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/', validateCreateBlockedContact, verifyToken, createBlockedContact)
  .get('/:user_id', validateGetBlockedContacts, verifyToken, getBlockContacts)
  .delete(
    '/:id',
    validateDeleteBlockedContact,
    verifyToken,
    deleteBlockContact
  );

export default router;
