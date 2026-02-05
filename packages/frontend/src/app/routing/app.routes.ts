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
    loadComponent: () => import('../features/tasks-board/containers/task-board-page/task-board-page.component')
      .then(m => m.TaskBoardPageComponent),
  },
  {
    path: '**',
    redirectTo: ERoute.TASKS_BOARD,
  },
];
