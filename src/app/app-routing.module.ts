import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainShellComponent } from './main-shell/main-shell.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { GuestGuard } from './guards/guest.guard';
import { BoardDialogComponent } from './dialog/board-dialog/board-dialog.component';

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
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
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
      {
        path: 'board',
        loadChildren: () =>
          import('./target-board/target-board.module').then(
            (m) => m.TargetBoardModule
          ),
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
  entryComponents: [BoardDialogComponent],
})
export class AppRoutingModule {}
