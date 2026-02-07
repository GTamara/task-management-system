import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TasksStoreService } from '../../services/tasks-store-service/tasks-store.service';
import { TasksListComponent } from '@features/tasks-board/components/tasks-list/tasks-list.component';

@Component({
  selector: 'app-task-board-page',
  imports: [
    TasksListComponent,
  ],
  templateUrl: './task-board-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskBoardPageComponent implements OnInit {

  private readonly store = inject(TasksStoreService);

  ngOnInit(): void {
    this.store.getTasks();
  }
}
