import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TargetComponent } from '../target/target/target.component';
import { TargetBoardComponent } from './target-board/target-board.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TargetBoardComponent,
    children: [
      {
        path: ':boardId',
        component: TargetBoardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TargetBoardRoutingModule {}
