import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/interfaces/task';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  form = this.fb.group({
    tasks: this.fb.array([])
  });

  get tasks(): FormArray {
    return this.form.get('tasks') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  createTask() {
    const tasks = this.form.value.tasks;
    Promise.all(
      tasks.map((task) => {
        const taskData: Omit<Task, 'taskId' | 'createdAt'> = {
          title: task.title,
          taskDate: task.taskDate,
        };
        return this.taskService.createTask(taskData);
      })
    ).then(() => {
      this.snackBar.open('タスクを作成しました！', null, {
        duration: 2000,
      });
    });
  }

  addTask() {
    const taskFormGroup = this.fb.group({
      title: ['', [Validators.required]],
      taskDate: ['', [Validators.required]]
    });
    this.tasks.push(taskFormGroup);
  }

  removeTask(index: number) {
    this.tasks.removeAt(index);
  }
  submit() {
    console.log(this.form.value);
  }
}
