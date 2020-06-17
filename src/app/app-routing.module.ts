import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainShellComponent } from './main-shell/main-shell.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: {
      root: true,
    },
    loadChildren: () => import('./top/top.module').then((m) => m.TopModule),
  },
  {
    path: '',
    component: MainShellComponent,
    children: [
      {
        path: 'create',
        loadChildren: () =>
          import('./create/create.module').then((m) => m.CreateModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'target',
        loadChildren: () =>
          import('./target/target.module').then((m) => m.TargetModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
