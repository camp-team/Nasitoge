import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private snackBar: MatSnackBar, private db: AngularFirestore) {}

  getTasks(): Observable<Task[]> {
    return this.db.collection<Task>('tasks').valueChanges();
  }

  createTask(task: Omit<Task, 'taskId' | 'createdAt'>): Promise<void> {
    const taskId = this.db.createId();
    const taskDoc: Task = {
      taskId,
      title: task.title,
      createdAt: firestore.Timestamp.now(),
      taskDate: task.taskDate,
      memos: task.memos,
      targetId: task.targetId,
    };
    console.log(taskDoc.targetId);
    return this.db.doc(`tasks/${taskId}`).set(taskDoc);
  }

  deleteTask(taskId: string): Promise<void> {
    return this.db.doc(`tasks/${taskId}`).delete();
  }

  updateMemo(task: Task): Promise<void> {
    return this.db.doc(`tasks/${task.taskId}`).set(task, {
      merge: true,
    });
  }
}
