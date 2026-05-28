import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import Activity from '../models/activity.model';

export const login = async (req: Request, res: Response) => {
  const { userId, password, role } = req.body;

  try {
    // Find user by userId and role
    const user = await User.findOne({ userId, role });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // Save failed activity log
      await Activity.create({
        userId: user._id,
        userName: user.name,
        action: 'Login',
        status: 'Failed'
      });
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Save success activity log
    await Activity.create({
      userId: user._id,
      userName: user.name,
      action: 'Login',
      status: 'Success'
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userId: user.userId,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};