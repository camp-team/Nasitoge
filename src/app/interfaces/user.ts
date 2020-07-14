import { firestore } from 'firebase';

export interface User {
  authorUid: string;
  avatarURL: string;
  name: string;
  createdAt: firestore.Timestamp;
  email: string;
}
