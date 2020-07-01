import { firestore } from 'firebase';

export interface Target {
  authorUid: string;
  targetId: string;
  target: string;
  targetDate: firestore.Timestamp;
  createdAt: firestore.Timestamp;
}
