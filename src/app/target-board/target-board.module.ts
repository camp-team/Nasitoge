import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargetBoardRoutingModule } from './target-board-routing.module';
import { TargetBoardComponent } from './target-board/target-board.component';
import { BoardCardComponent } from './board-card/board-card.component';
import { MatCardModule } from '@angular/material/card';
import { BoardListComponent } from './board-list/board-list.component';

@NgModule({
  declarations: [TargetBoardComponent, BoardCardComponent, BoardListComponent],
  imports: [CommonModule, TargetBoardRoutingModule, MatCardModule],
})
export class TargetBoardModule {}
