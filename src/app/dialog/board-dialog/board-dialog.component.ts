import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { BoardService } from 'src/app/services/board.service';
import { TargetBoard } from 'src/app/interfaces/target-board';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-board-dialog',
  templateUrl: './board-dialog.component.html',
  styleUrls: ['./board-dialog.component.scss'],
})
export class BoardDialogComponent implements OnInit {
  form = this.fb.group({
    boardTitle: ['', [Validators.required, Validators.maxLength(50)]],
  });

  get boardTitle(): FormControl {
    return this.form.get('boardTitle') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private boardService: BoardService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  createTargetBoard() {
    const title = this.form.value.boardTitle;
    Promise.all(
      title.map((board) => {
        const boardData: Omit<TargetBoard, 'boardId'> = {
          title: board.title,
          authorUid: board.authorUid,
        };
        return this.boardService.createTargetBoard(boardData);
      })
    ).then(() => {
      this.snackBar.open('新しいボードを作成しました！', null, {
        duration: 2500,
      });
    });
  }
}
