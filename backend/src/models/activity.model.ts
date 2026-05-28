import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  userName: string;
  action: string;
  date: Date;
  status: 'Success' | 'Failed';
}

const ActivitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  action: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Success', 'Failed'], required: true }
}, { timestamps: true });

export default mongoose.model<IActivity>('Activity', ActivitySchema);