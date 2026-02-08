import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EPriority, EStatus, Task } from '../../types';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { TasksApiService } from '../tasks-api-service/tasks-api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToastService } from '@core/services/toast-service/toast.service';
import { TaskFormService } from '../task-form-service/task-form.service';
import { TaskFormGroup } from '@features/tasks-board/types/task-form';
import { generateId } from '@lib/utils/generate-id';

interface State {
  tasks: Task[] | undefined;
  isLoading: boolean;
}

const DEFAULT_STATE = {
  tasks: [],
  isLoading: false,
}

@Injectable({
  providedIn: 'root'
})
export class TasksStoreService extends ComponentStore<State> {

  private readonly api = inject(TasksApiService);
  private readonly toastService = inject(ToastService);
  private readonly formService = inject(TaskFormService);

  readonly taskForm: TaskFormGroup = this.formService.getTaskForm();

  constructor() {
    super(DEFAULT_STATE);
  }

  readonly tasksSignal = toSignal(
    this.select(state => state.tasks),
    { initialValue: [] }
  );

  readonly isLoadingSignal = toSignal(
    this.select(state => state.isLoading),
    { initialValue: false }
  );

  readonly getTasks = this.effect((trigger$: Observable<void>) => trigger$.pipe(
    tap(() => this.updateIsLoading(true)),
    switchMap(() => {
      return this.api.getTasks().pipe(
        catchError(e => {
          this.toastService.showError('Ошибка получаения данных');
          console.error(e);
          return of([]);
        })
      );
    }),
    tap(tasks => {
      this.patchState({
        isLoading: false,
        tasks,
      });
    }),
  ));

  readonly createTask = this.effect((trigger$: Observable<void>) => {
    return trigger$.pipe(
      tap(() => this.updateIsLoading(true)),
      switchMap(() => {
        const formData = this.taskForm.getRawValue();
        const task: Task = {
          id: generateId(),
          title: formData.title,
          description: formData.description,
          createdAt: new Date().toISOString(),
          status: formData.status ?? EStatus.NONE,
          priority: formData.priority ?? EPriority.NONE,
        }

        return this.api.createTask(task).pipe(
          catchError(e => {
            this.toastService.showError('Ошибка создания задачи');
            console.error(e);
            return of(null);
          })
        );
      }),
      tap(() => {
        this.toastService.showSuccess('Задача успешносоздана');
        this.getTasks();
      })
    )
  })

  private readonly updateIsLoading = this.updater((state, isLoading: boolean) => {
    return {
      ...state,
      isLoading,
    };
  });

  private readonly updateTasks = this.updater((state, tasks: Task[]) => {
    return {
      ...state,
      tasks,
    };
  });
}
