import { Router } from 'express';
import {
  auth,
  users,
  abouts,
  contacts,
  blockedContacts,
  profilePictures,
  chats,
  groups,
  groupMembers,
  messages
} from './api';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/abouts', abouts);
router.use('/contacts', contacts);
router.use('/blocked-contacts', blockedContacts);
router.use('/chats', chats);
router.use('/profile-pictures', profilePictures);
router.use('/groups', groups);
router.use('/group-members', groupMembers);
router.use('/messages', messages);

export default router;
