import { firestore } from 'firebase';

export interface Task {
  task: string;
  createdAt: firestore.Timestamp;
  taskId: string;
}
