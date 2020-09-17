import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from 'src/app/services/board.service';
import { Observable } from 'rxjs';
import {
  TargetBoard,
  TargetBoardWithAuthor,
} from 'src/app/interfaces/target-board';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-target-board',
  templateUrl: './target-board.component.html',
  styleUrls: ['./target-board.component.scss'],
})
export class TargetBoardComponent implements OnInit {
  board$: Observable<TargetBoardWithAuthor> = this.route.paramMap.pipe(
    switchMap((paramMap) => {
      const id = paramMap.get('boardId');
      return this.boardService.getTargetBoardWithAuthorIdByBoardId(id);
    })
  );

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {}
}
