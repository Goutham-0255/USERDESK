import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/user.model';
import Announcement from '../models/announcement.model';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected');

    // Clear existing data
    await User.deleteMany({});
    await Announcement.deleteMany({});

    // Hash passwords
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const userPassword = await bcrypt.hash('User@123', 10);
    const admin123Password = await bcrypt.hash('admin123', 10);
    const user123Password = await bcrypt.hash('user123', 10);

    // Create users
    await User.insertMany([
      {
        name: 'System Admin',
        email: 'admin005@userdesk.com',
        userId: 'user005',
        password: admin123Password,
        role: 'Admin'
      },
      {
        name: 'Standard User',
        email: 'user006@userdesk.com',
        userId: 'user006',
        password: user123Password,
        role: 'General User'
      },
      {
        name: 'Admin User',
        email: 'admin@userdesk.com',
        userId: 'admin001',
        password: adminPassword,
        role: 'Admin'
      },
      {
        name: 'Goutham N',
        email: 'goutham@userdesk.com',
        userId: 'user001',
        password: userPassword,
        role: 'General User'
      },
      {
        name: 'John Doe',
        email: 'john@userdesk.com',
        userId: 'user002',
        password: userPassword,
        role: 'General User'
      },
      {
        name: 'Jane Smith',
        email: 'jane@userdesk.com',
        userId: 'user003',
        password: userPassword,
        role: 'General User'
      }
    ]);

    // Create announcements
    await Announcement.insertMany([
      {
        title: 'Welcome to UserDesk',
        description: 'Welcome to the UserDesk platform. Please update your profile.',
        createdBy: 'Admin User',
        date: new Date()
      },
      {
        title: 'System Maintenance',
        description: 'Scheduled maintenance on Sunday 2AM - 4AM. Plan accordingly.',
        createdBy: 'Admin User',
        date: new Date()
      },
      {
        title: 'New Policy Update',
        description: 'Please review the updated company policies in the documents section.',
        createdBy: 'Admin User',
        date: new Date()
      }
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();