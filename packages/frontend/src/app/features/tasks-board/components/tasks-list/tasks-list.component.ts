import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TasksStoreService } from '@features/tasks-board/services/tasks-store-service/tasks-store.service';
import { SpinnerComponent } from '@lib/components/spinner/spinner';
import { TaskItemComponent } from '../task-item/task-item.component';
import { EmptyDataMessageComponent } from '@lib/components/empty-data-message/empty-data-message.component';
import { TasksFiltersComponent } from '../tasks-list-filters/tasks-filters.component';
import { Task } from '@features/tasks-board/types';
import { FiltersState } from '@features/tasks-board/types/filters-types';
import { createKeys } from '@lib/utils/check-all-keys';

@Component({
  selector: 'app-tasks-list',
  imports: [
    SpinnerComponent,
    TaskItemComponent,
    EmptyDataMessageComponent,
    TasksFiltersComponent,
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent {

  private readonly store = inject(TasksStoreService);

  protected readonly storedTasks = this.store.tasksSignal;
  protected readonly isLoadingSignal = this.store.isLoadingSignal;

  private readonly filtersState = signal<FiltersState>({
    priority: null,
    status: null,
    date: null
  });

  private readonly _taskKeysCache = new Set<keyof Task>(
    createKeys<Task>()(
      'id',
      'title',
      'description',
      'priority',
      'createdAt',
      'status'
    )
  );

  protected readonly filteredTasks = computed(() => {
    const filters = this.filtersState();
    return this.getFilteredTasks(filters);
  });

  protected updateFiltersState(evt: Partial<FiltersState>) {
    this.filtersState.set({
      ...this.filtersState(),
      ...evt,
    });
  }

  private getFilteredTasks(filters: FiltersState): Task[] {

    const sourceTasks = this.storedTasks();
    let result: Task[] = sourceTasks ?? [];
    Object.entries(filters).forEach(([key, value]) => {
      if (!!value && this.isTaskKeyGuard(key)) {
        result = result?.filter(task => task[key] === value);
      }
    });
    return result;

  }

  private isTaskKeyGuard(key: unknown): key is keyof Task {
    return typeof key === 'string' && this._taskKeysCache.has(key as keyof Task);
  }
}
