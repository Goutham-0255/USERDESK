import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import Announcement from '../models/announcement.model';

// User Management
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const { name, email, userId, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email, userId,
      password: hashedPassword,
      role
    });
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    ).select('-password');
    res.json({ message: 'User updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Announcement Management
export const addAnnouncement = async (req: Request, res: Response) => {
  try {
    const { title, description, createdBy } = req.body;
    const announcement = await Announcement.create({
      title, description, createdBy
    });
    res.status(201).json({ message: 'Announcement created', announcement });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteAnnouncement = async (req: Request, res: Response) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Announcement deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};