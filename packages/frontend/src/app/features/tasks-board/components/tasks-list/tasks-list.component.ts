import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TasksStoreService } from '@features/tasks-board/services/tasks-store-service/tasks-store.service';
import { SpinnerComponent } from '@lib/components/spinner/spinner';
import { TaskItemComponent } from '../task-item/task-item.component';
import { EmptyDataMessageComponent } from '@lib/components/empty-data-message/empty-data-message.component';
import { TasksFiltersComponent } from '../tasks-list-filters/tasks-filters.component';
import { ALL_TASK_KEYS, Task } from '@features/tasks-board/types';
import { FiltersState } from '@features/tasks-board/types/filters-types';
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
    createdAt: null,
    search: null,
  });

  protected readonly filteredTasks = computed(() => {
    const filters = this.filtersState();
    let tasks = this.storedTasks();

    if (!tasks) return

    if (filters.search) {
      tasks = this.searchByTitleOrDescription(filters.search, tasks);
    }

    if (filters.status) {
      tasks = this.filterByStatusOrPriority(ALL_TASK_KEYS.STATUS, filters.status, tasks);
    }

    if (filters.priority) {
      tasks = this.filterByStatusOrPriority(ALL_TASK_KEYS.PRIORITY, filters.priority, tasks);
    }

    if (filters.createdAt) {
      tasks = this.filterByDate(filters.createdAt, tasks);
    }

    return tasks;
  });

  protected updateFiltersState(evt: Partial<FiltersState>) {
    this.filtersState.set({
      ...this.filtersState(),
      ...evt,
    });
  }

  private searchByTitleOrDescription (value: string, tasks: Task[]) {
    return tasks.filter(task => task.title.toLowerCase().includes(value)
      || task.description.toLowerCase().includes(value)
    );
  }

  /* filter by status & priority */
  private filterByStatusOrPriority(key: keyof Task, value: string, tasks: Task[]): Task[] {
    return tasks.filter(task => task[key] === value);
  }

  private filterByDate (value: FiltersState['createdAt'], tasks: Task[]): Task[] {
    const start = value?.startDate;
    const end = value?.endDate;

    if (!start || !end) {
      return tasks;
    };

    return tasks.filter(task => {
      const taskDate = new Date(task.createdAt);
      const taskDateTimestamp = taskDate.getTime();
      return taskDateTimestamp >= start.getTime()
        && taskDateTimestamp <= end.getTime();
    });
  }

}
