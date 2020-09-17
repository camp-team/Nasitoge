import { Component, OnInit, Input } from '@angular/core';
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
  @Input() targetId: string;

  form = this.fb.group({
    tasks: this.fb.array([]),
  });
  processing: boolean;

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
          memos: task.memo,
          targetId: this.targetId,
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
      taskDate: ['', [Validators.required]],
      memo: ['', []],
      subTasks: this.fb.array([]),
    });
    this.tasks.push(taskFormGroup);
  }

  addSubTask(index: number) {
    const subTasks = this.tasks.controls[index].get('subTasks') as FormArray;
    subTasks.push(this.fb.control('', [Validators.required]));
  }

  removeSubTask(taskIndex: number, subTaskIndex: number) {
    const subTasks = this.tasks.controls[taskIndex].get(
      'subTasks'
    ) as FormArray;
    subTasks.removeAt(subTaskIndex);
  }

  removeTask(index: number) {
    this.tasks.removeAt(index);
  }
  submit() {
    this.processing = true;
    this.processing = false;
  }
}
