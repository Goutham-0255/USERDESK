export interface User {
  _id: string;
  name: string;
  email: string;
  userId: string;
  role: 'General User' | 'Admin';
}