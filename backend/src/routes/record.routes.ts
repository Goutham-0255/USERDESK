import { Router } from 'express';
import { getRecords } from '../controllers/record.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', verifyToken, getRecords);

export default router;