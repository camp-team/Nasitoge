import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Memo } from '../interfaces/memo';
import { firestore } from 'firebase';
import { Task } from '../interfaces/task';
import { from } from 'rxjs';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class MemoService {
  constructor(private db: AngularFirestore, private taskService: TaskService) {}
}
