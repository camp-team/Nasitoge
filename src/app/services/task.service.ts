import { Injectable } from '@angular/core';
import { createUploadTask } from '@angular/fire/storage/task';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { firestore } from 'firebase';
import { Task, TaskWithTarget } from '../interfaces/task';
import { promise } from 'protractor';
import { stringify } from 'querystring';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TargetWithAuthor, Target } from '../interfaces/target';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private snackBar: MatSnackBar,
    private db: AngularFirestore,
    private router: Router
  ) {}

  getTaskByTaskId(taskId: string): Observable<Task> {
    return this.db.doc<Task>(`tasks/${taskId}`).valueChanges();
  }

  createTask(task: Omit<Task, 'taskId' | 'createdAt'>): Promise<void> {
    const taskId = this.db.createId();
    const taskDoc: Task = {
      taskId,
      title: task.title,
      createdAt: firestore.Timestamp.now(),
      taskDate: task.taskDate,
    };
    return this.db.doc(`tasks/${taskId}`).set(taskDoc);
  }

  deleteTask(taskId: string): Promise<void> {
    return this.db.doc(`tasks/${taskId}`).delete();
  }

  //  //  getTaskWithTargetByTargetId(targetId: string): Observable<TaskWithTarget> {
  //  //   return this.db
  //  //     .doc<TaskWithTarget>(`tasks/${targetId}`)
  //  //     .valueChanges()
  //  //     .pipe(
  //  //       switchMap((task: Task) => {
  //  //         const target$: Observable<Target> = this.db
  //  //        .doc
  //  //       }

  //         )
  //       );
  //   }
}
