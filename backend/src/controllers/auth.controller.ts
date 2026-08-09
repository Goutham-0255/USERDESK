import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import Activity from '../models/activity.model';

import mongoose from 'mongoose';

export const login = async (req: Request, res: Response) => {
  const { userId, password, role } = req.body;

  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ 
      message: 'Database connection offline. Please check your backend connection to MongoDB.' 
    });
  }

  try {
    // Find user by userId (case-insensitive)
    const user = await User.findOne({ userId: { $regex: new RegExp(`^${userId}$`, 'i') } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (role && user.role !== role) {
      return res.status(401).json({ message: `Role mismatch: User ${user.userId} is registered as "${user.role}"` });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // Save failed activity log asynchronously
      Activity.create({
        userId: user._id,
        userName: user.name,
        action: 'Login',
        status: 'Failed'
      }).catch(err => console.error('Failed log error:', err));

      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Save success activity log asynchronously
    Activity.create({
      userId: user._id,
      userName: user.name,
      action: 'Login',
      status: 'Success'
    }).catch(err => console.error('Success log error:', err));

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET as string || 'fallback_secret',
      { expiresIn: '1d' }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userId: user.userId,
        role: user.role
      }
    });

  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ message: err.message || 'Server error during login' });
  }
};