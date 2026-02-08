import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskBoardPageComponent } from './containers/task-board-page/task-board-page.component';
import { TasksViewStateService } from './services/tasks-view-state/tasks-view-state.service';
import { TasksApiService } from './services/tasks-api-service/tasks-api.service';
import { TasksStoreService } from './services/tasks-store-service/tasks-store.service';
import { TaskFormService } from './services/task-form-service/task-form.service';

export const TASKS_BOARD_ROUTES = [
  {
    path: '',
    component: TaskBoardPageComponent,
    providers: [
      TasksApiService,
      TasksStoreService,
      TasksViewStateService,
      TaskFormService,
    ],
    children: [
      { path: 'new', component: TaskFormComponent, data: { mode: 'new' } },
      { path: ':id', component: TaskFormComponent, data: { mode: 'view' } },
      { path: ':id/edit', component: TaskFormComponent, data: { mode: 'edit' } }
    ],
  }
]
