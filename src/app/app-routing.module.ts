import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainShellComponent } from './main-shell/main-shell.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: {
      root: true,
    },
    loadChildren: () => import('./top/top.module').then((m) => m.TopModule),
    canLoad: [GuestGuard],
    canActivate: [GuestGuard],
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
        path: 'target/:targetId',
        loadChildren: () =>
          import('./target/target.module').then((m) => m.TargetModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'index',
        loadChildren: () =>
          import('./index/index.module').then((m) => m.IndexModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
