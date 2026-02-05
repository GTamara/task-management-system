import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Task } from '../../types';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { TasksApiService } from '../tasks-api-service/tasks-api.service';
import { ToastService } from '../../../../core/services/toast-service/toast.service';
import { toSignal } from '@angular/core/rxjs-interop';

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

  constructor() {
    super(DEFAULT_STATE);
  }

  readonly tasksSignal = toSignal(
    this.select(state => state.tasks),
    { initialValue: [] }
  )

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
      // this.updateIsLoading(false);
      // this.updateTasks(tasks);
      this.patchState({
        isLoading: false,
        tasks,
      });
    }),
  ))

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
