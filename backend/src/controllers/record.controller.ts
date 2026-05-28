import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import Announcement from '../models/announcement.model';

export const getRecords = async (req: AuthRequest, res: Response) => {
  try {
    // Get delay from query parameter
    const delay = parseInt(req.query.delay as string) || 0;

    // Wait for the delay duration
    await new Promise(resolve => setTimeout(resolve, delay));

    const announcements = await Announcement.find().sort({ date: -1 });

    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};