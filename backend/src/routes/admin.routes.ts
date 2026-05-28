import { Router } from 'express';
import {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  addAnnouncement,
  deleteAnnouncement
} from '../controllers/admin.controller';
import { verifyToken, verifyAdmin } from '../middleware/auth.middleware';

const router = Router();

// All admin routes are protected by verifyToken and verifyAdmin
router.use(verifyToken, verifyAdmin);

// User management
router.get('/users', getAllUsers);
router.post('/users', addUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Announcement management
router.post('/announcements', addAnnouncement);
router.delete('/announcements/:id', deleteAnnouncement);

export default router;