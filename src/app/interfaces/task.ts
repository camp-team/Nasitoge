import { firestore } from 'firebase';
import { TargetWithAuthor } from './target';
import { Target } from '@angular/compiler';
export interface Task {
  title: string;
  taskId: string;
  createdAt: firestore.Timestamp;
  taskDate: firestore.Timestamp;
  memos: string[];
  targetId: string;
}

export interface TaskWithTarget extends Target {
  target: Target;
}
