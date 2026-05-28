import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import User from '../models/user.model';

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};