import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'top',
    loadChildren: () => import('./top/top.module').then(m => m.TopModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then(m => m.CreateModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
