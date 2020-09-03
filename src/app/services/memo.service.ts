import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Memo } from '../interfaces/memo';
import { firestore } from 'firebase';
import { Task } from '../interfaces/task';
import { from } from 'rxjs';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class MemoService {

  constructor(
    private db: AngularFirestore,
    private taskService: TaskService
  ) { }

  createMemo(memo: Omit<Memo, 'memoId' | 'createdAt'>): Promise<void> {
    const memoId: string = this.db.createId();
    const memoDoc: Memo = {
      memoId,
      memoText: memo.memoText,
      createdAt: firestore.Timestamp.now(),
    };
    return this.db.doc<Memo>(`tasks/taskId/memos/${memoDoc.memoId}`).set(memoDoc);

  }
}
