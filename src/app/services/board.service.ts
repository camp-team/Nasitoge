import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TargetBoard, TargetBoardWithAuthor } from '../interfaces/target-board';
import { Observable, combineLatest, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {}

  createTargetBoard(
    board: Omit<TargetBoard, 'boardId' | 'authorId'>
  ): Promise<void> {
    const boardId = this.db.createId();
    const targetBoard: TargetBoard = {
      title: board.title,
      boardId,
      authorUid: board.authorUid,
    };
    return this.db
      .doc(`boards/${boardId}`)
      .set(targetBoard)
      .then(() => {
        this.router.navigateByUrl('/board' + boardId);
      });
  }

  getTargetBoardWithAuthorIdByBoardId(
    boardId: string
  ): Observable<TargetBoardWithAuthor> {
    return this.db
      .doc<TargetBoard>(`boards/${boardId}`)
      .valueChanges()
      .pipe(
        switchMap((board: TargetBoard) => {
          const user$: Observable<User> = this.db
            .doc<User>(`users/${board.authorUid}`)
            .valueChanges();
          return combineLatest([user$, of(board)]);
        }),
        map(([author, board]) => {
          return {
            ...board,
            author,
          };
        })
      );
  }
  getTargetBoardByBoardId(boardId: string): Observable<TargetBoard> {
    return this.db.doc<TargetBoard>(`boards/${boardId}`).valueChanges();
  }
}
