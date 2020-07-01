import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TargetComponent } from './target/target.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TargetComponent,
  },
  {
    path: ':targetId',
    component: TargetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TargetRoutingModule {}
