import { firestore } from 'firebase';
import { User } from './user';

export interface Target {
  authorUid: string;
  targetId: string;
  target: string;
  targetDate: firestore.Timestamp;
  createdAt: firestore.Timestamp;
}

export interface TargetWithAuthor extends Target {
  author: User;
}
