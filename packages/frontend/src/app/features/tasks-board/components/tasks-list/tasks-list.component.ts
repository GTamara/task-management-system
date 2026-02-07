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
    createdAt: null
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
    console.log('updateFiltersState', Object.entries(filters));
    const sourceTasks = this.storedTasks();
    let result: Task[] = sourceTasks ?? [];
    Object.entries(filters).forEach(([key, value]) => {
      console.log('forEach', key, !!value);
      if (!!value && this.isTaskKeyGuard(key)) {
        switch (key) {
          case 'priority':
          case 'status':
            result = this.filterByVisualEntity(key, value, result);
            break;
          case 'createdAt':
            result = this.filterByDate(value, result);
            break;
        }
      }
    });
    return result;

  }

  /* filter by status & priority */
  private filterByVisualEntity(key: keyof Task, value: string, tasks: Task[]): Task[] {
    return tasks?.filter(task => task[key] === value);
  }

  private filterByDate (value: FiltersState['createdAt'], tasks: Task[]): Task[] {
    const start = value?.startDate;
    const end = value?.endDate;
    console.log(start, end, value);
    if (!start || !end) {
      return tasks;
    };
    return tasks?.filter(task => {
      const taskDate = new Date(task.createdAt);
      const taskDateTimestamp = taskDate.getTime();
      return taskDateTimestamp >= start.getTime()
        && taskDateTimestamp <= end.getTime();
    });
  }

  private isTaskKeyGuard(key: unknown): key is keyof Task {
    return typeof key === 'string' && this._taskKeysCache.has(key as keyof Task);
  }
}
