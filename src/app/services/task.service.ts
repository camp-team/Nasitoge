import { Injectable } from '@angular/core';
import { createUploadTask } from '@angular/fire/storage/task';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';
import { Task } from '../interfaces/task';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private db: AngularFirestore) {}

  createTask(data: Task): Promise<void> {
    const taskId = this.db.createId();
    return this.db.doc(`tasks/${taskId}`).set({
      taskId,
      ...data,
      createdAt: new Date(),
    });
  }

  deleteTask(taskId: string): Promise<void> {
    return this.db.doc(`tasks/${taskId}`).delete();
  }

  getTaskByTaskId(taskId: string): Observable<Task> {
    return this.db.doc<Task>(`tasks/${taskId}`).valueChanges();
  }
}
