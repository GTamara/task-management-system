import { Routes } from '@angular/router';
import { ERoute } from './types';

export const routes: Routes = [
  {
    path: '',
    redirectTo: ERoute.TASKS_BOARD,
    pathMatch: 'full',
  },
  {
    path: ERoute.TASKS_BOARD,
    loadChildren: () => import('../features/tasks-board/tasks-board.routes')
      .then(m => m.TASKS_BOARD_ROUTES),
  },
  {
    path: '**',
    redirectTo: ERoute.TASKS_BOARD,
  },
];
