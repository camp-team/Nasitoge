import { firestore } from 'firebase';

export interface Memo{
  memoText: string;
  memoId: string;
  createdAt: firestore.Timestamp;
}

