import { Router } from 'express';
import {
  validateCreateContact,
  validateGetContacts,
  validateGetContact,
  validateUpdateContact,
  validateDeleteContact
} from '../../middlewares/validation/contacts';
import {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact
} from '../../controllers/contacts';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/', validateCreateContact, verifyToken, createContact)
  .get('/:id', validateGetContact, verifyToken, getContact)
  .get('/all/:user_id', validateGetContacts, verifyToken, getContacts)
  .patch('/:id', validateUpdateContact, verifyToken, updateContact)
  .delete('/:id', validateDeleteContact, verifyToken, deleteContact);

export default router;
