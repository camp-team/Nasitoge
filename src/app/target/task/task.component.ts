import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { TargetService } from 'src/app/services/target.service';
import { Task } from 'src/app/interfaces/task';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  form = this.fb.group({
    title: ['', Validators.required],
    taskDate: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get taskDate(): FormControl {
    return this.form.get('taskDate') as FormControl;
  }

  // addTask(){
  //   const formGroup = this.fb.group({
  //     title: ['', [Validators.required]],
  //   });
  //   this.title.push(formGroup);
  // }

  // removeTask(index: number){
  //   this.title.removeAt(index);
  // }

  submit() {
    console.log(this.form.value);
  }

  ngOnInit(): void {}

  createTask() {
    const value = this.form.value;
    const task: Omit<Task, 'taskId' | 'createdAt'> = {
      title: value.title,
      taskDate: value.taskDate,
    };
    this.taskService.createTask(task).then(() => {
      this.snackBar.open('タスクを作成しました！', null, {
        duration: 2000,
      });
    });
  }
}
