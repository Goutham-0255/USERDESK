import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import Activity from '../models/activity.model';

export const getActivity = async (req: AuthRequest, res: Response) => {
  try {
    let activity;

    if (req.user.role === 'Admin') {
      // Admin sees all activity
      activity = await Activity.find().sort({ date: -1 });
    } else {
      // General User sees only their own activity
      activity = await Activity.find({ userId: req.user.id }).sort({ date: -1 });
    }

    res.json(activity);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};