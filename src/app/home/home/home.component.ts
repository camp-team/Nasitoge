import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BoardService } from 'src/app/services/board.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogComponent } from '../../dialog/board-dialog/board-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private boardService: BoardService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openCreateBoardDialog() {
    this.dialog.open(BoardDialogComponent, {
      width: '640px',
      autoFocus: false,
      restoreFocus: false,
    });
  }
}
