import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  userId: string;
  password: string;
  role: 'General User' | 'Admin';
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['General User', 'Admin'], required: true }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);