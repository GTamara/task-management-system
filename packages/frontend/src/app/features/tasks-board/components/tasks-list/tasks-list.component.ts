import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { TasksStoreService } from '@features/tasks-board/services/tasks-store-service/tasks-store.service';
import { SpinnerComponent } from '@lib/components/spinner/spinner';
import { TaskItemComponent } from '../task-item/task-item.component';
import { EmptyDataMessageComponent } from '@lib/components/empty-data-message/empty-data-message.component';
import { TasksFiltersComponent } from '../tasks-list-filters/tasks-filters.component';
import { ALL_TASK_KEYS, Task } from '@features/tasks-board/types';
import { FiltersState } from '@features/tasks-board/types/filters-types';
import { SortState } from '@lib/components/filter-menu/sort-types';
import { PRIORITY_CONFIG } from '@features/tasks-board/constants/priority-config';
import { STATUS_CONFIG } from '@features/tasks-board/constants/status-config';
import { Router } from '@angular/router';
import { ERoute } from '@routing/types';
import { TasksViewStateService } from '@features/tasks-board/services/tasks-view-state/tasks-view-state.service';
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
  private readonly router = inject(Router);
  private readonly tasksViewStateService = inject(TasksViewStateService);

  protected readonly storedTasks = this.store.tasksSignal;
  protected readonly isLoadingSignal = this.store.isLoadingSignal;

  protected readonly selectedTaskId = signal<Task['id'] | null>(null);

  constructor() {
    effect(() => {
      const isTaskDetailViewActive = this.tasksViewStateService.isTaskDetailViewActiveSignal();

      if (!isTaskDetailViewActive) {
        this.selectedTaskId.set(null);
      }
    })
  }

  private readonly filtersState = signal<FiltersState>({
    priority: null,
    status: null,
    createdAt: null,
    search: null,
  });

  protected readonly sortState = signal<SortState>({
    field: {
      title: 'Дата создания',
      code: ALL_TASK_KEYS.createdAt,
    },
    direction: 'desc',
  });

  protected readonly displayedTasks = computed(() => {
    let tasks = this.storedTasks();

    if (!tasks) return

    const filters = this.filtersState();

    if (filters.search) {
      tasks = this.searchByTitleOrDescription(filters.search, tasks);
    }
    if (filters.status) {
      tasks = this.filterByStatusOrPriority(ALL_TASK_KEYS.status, filters.status, tasks);
    }
    if (filters.priority) {
      tasks = this.filterByStatusOrPriority(ALL_TASK_KEYS.priority, filters.priority, tasks);
    }
    if (filters.createdAt) {
      tasks = this.filterByDate(filters.createdAt, tasks);
    }

    const sortSTate = this.sortState();
    tasks = this.sortData(sortSTate, tasks);
    return tasks;
  });

  protected updateFiltersState(evt: Partial<FiltersState>) {
    this.filtersState.set({
      ...this.filtersState(),
      ...evt,
    });
  }

  protected updateSortState(evt: SortState) {
    this.sortState.set({
      ...this.sortState(),
      ...evt,
    });
  }

  selectTask (id: Task['id']) {
    this.selectedTaskId.set(id);
    this.router.navigate([ERoute.TASKS_BOARD, id]);
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

  private sortData(sort: SortState, tasks: Task[]): Task[] {
    const tasksToSort = [...tasks];
    const dir = sort.direction === 'asc' ? 1 : -1;
    const code = sort.field.code as keyof Task;
    const getSortValue = this.sortValueGetter(code);

    tasksToSort.sort((a, b) => {
      const aValue: string | number | Date = getSortValue(a);
      const bValue: string | number | Date = getSortValue(b);
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;

      return (aValue < bValue ? -1 : aValue > bValue ? 1 : 0) * dir;
    });

    return tasksToSort;
  }

  private sortValueGetter (
    code: keyof Task
  ): (task: Task)  => Task[keyof Task] | number  {
    switch (code) {
      case ALL_TASK_KEYS.priority:
        return (task: Task) => PRIORITY_CONFIG[task[code]].order ?? 0;
      case ALL_TASK_KEYS.status:
        return (task: Task) => STATUS_CONFIG[task[code]].order ?? 0;
      case ALL_TASK_KEYS.createdAt:
        return (task: Task) => new Date(task[code]).getTime();
      default:
        return (task: Task) => task[code];
    }
  }
}
