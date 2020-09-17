import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { MemoService } from 'src/app/services/memo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.scss'],
})
export class MemoComponent implements OnInit {
  @Input() targetId: string;

  tasks$ = this.taskService.getTasks();

  form = this.fb.group({
    memos: this.fb.array([]),
  });

  get memos(): FormArray {
    return this.form.get('memos') as FormArray;
  }

  constructor(
    private memoService: MemoService,
    private taskService: TaskService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  addMemos() {
    const memoFormGroup = this.fb.group({
      memo: ['', [Validators.required]],
    });
    this.memos.push(memoFormGroup);
  }

  removeMemos(index: number) {
    this.memos.removeAt(index);
  }

  updateMemo(task) {
    this.taskService.updateMemo(task).then(() => {
      this.snackBar.open('メモを更新しました！', null, {
        duration: 2500,
      });
    });
  }

  ngOnInit(): void {}
}
