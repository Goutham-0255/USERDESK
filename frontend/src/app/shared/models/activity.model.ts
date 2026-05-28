export interface Activity {
  _id: string;
  userId: string;
  userName: string;
  action: string;
  date: Date;
  status: 'Success' | 'Failed';
}