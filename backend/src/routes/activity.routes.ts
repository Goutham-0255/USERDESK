import { Router } from 'express';
import { getActivity } from '../controllers/activity.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', verifyToken, getActivity);

export default router;