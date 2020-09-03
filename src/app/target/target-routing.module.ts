import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TargetComponent } from './target/target.component';
import { MemoComponent } from './memo/memo.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TargetComponent,
  },
  {
    path: '/memo',
    pathMatch: 'full',
    component: MemoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TargetRoutingModule {}
