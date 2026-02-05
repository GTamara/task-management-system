import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TasksStoreService } from '@features/tasks-board/services/tasks-store-service/tasks-store.service';
import { SpinnerComponent } from '@lib/components/spinner/spinner';
import { TaskItemComponent } from '../task-item/task-item.component';
import { EmptyDataMessageComponent } from '@lib/components/empty-data-message/empty-data-message.component';

@Component({
  selector: 'app-tasks-list',
  imports: [
    SpinnerComponent,
    TaskItemComponent,
    EmptyDataMessageComponent,
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent {

  private readonly store = inject(TasksStoreService);

  protected readonly tasksSignal = this.store.tasksSignal;
  protected readonly isLoadingSignal = this.store.isLoadingSignal;
}
