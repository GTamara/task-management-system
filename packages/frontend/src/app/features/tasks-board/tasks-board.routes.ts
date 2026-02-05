import { TaskBoardPageComponent } from './containers/task-board-page/task-board-page.component';
import { TasksApiService } from './services/tasks-api-service/tasks-api.service';
import { TasksStoreService } from './services/tasks-store-service/tasks-store.service';

export const TASKS_BOARD_ROUTES = [
  {
    path: '',
    component: TaskBoardPageComponent,
    providers: [
      TasksApiService,
      TasksStoreService,
    ],
  }
]
