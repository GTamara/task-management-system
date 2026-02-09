import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EPriority, EStatus, Task } from '../../types';
import { catchError, EMPTY, exhaustMap, filter, finalize, Observable, of, switchMap, tap } from 'rxjs';
import { TasksApiService } from '../tasks-api-service/tasks-api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToastService } from '@core/services/toast-service/toast.service';
import { TaskFormService } from '../task-form-service/task-form.service';
import { TaskFormGroup } from '@features/tasks-board/types/task-form';
import { generateId } from '@lib/utils/generate-id';
import { MatDialog } from '@angular/material/dialog';
import { QuestionDialogComponent } from '@lib/components/question-dialog/question-dialog.component';
import { ERoute } from '@routing/types';
import { Router } from '@angular/router';

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
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  readonly taskForm: TaskFormGroup = this.formService.taskForm;

  constructor() {
    super(DEFAULT_STATE);
  }

  readonly tasksSignal = toSignal(
    this.select(state => state.tasks),
    { initialValue: [] }
  );

  selectTaskByIdSignal(id: Task['id']) {
    const tasks = this.tasksSignal() ?? [];
    return tasks.find(task => task.id === id);
  }

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
        this.toastService.showSuccess('Задача успешно создана');
        this.formService.resetForm();
        this.getTasks();
      })
    );
  });

  readonly editTask = this.effect((id$: Observable<Task['id']>) => id$.pipe(
    tap(() => {
      this.updateIsLoading(true);
    }),
    switchMap(id => {
      const formData = this.taskForm.getRawValue();
      const creationDate = this.selectTaskByIdSignal(id)?.createdAt;
      const taskData: Partial<Task> = {
        id,
        title: formData.title,
        description: formData.description,
        createdAt: creationDate,
        status: formData.status ?? EStatus.NONE,
        priority: formData.priority ?? EPriority.NONE,
      };
      return this.api.updateTask(taskData).pipe(
        catchError(e => {
          this.toastService.showError('Ошибка обновления задачи');
          console.error(e);
          return of(null);
        })
      )
    }),
    tap(() => {
      this.updateIsLoading(false);
      this.toastService.showSuccess('Задача успешно обновлена');
      this.getTasks();
    }),
  ));

  private removeTaskFromStore (id: string): void {
    this.patchState(state => ({
      tasks: state.tasks?.filter(task => task.id !== id)
    }));
  }

  readonly deleteTask = this.effect((id$: Observable<Task['id']>) => id$.pipe(
    exhaustMap(id => {
      return this.confirmDelete().pipe(
        filter(Boolean),
        switchMap(() => this.performDeleting(id))
      );
    })
  ));

  private performDeleting (id: string) {
    this.updateIsLoading(true);

    return this.api.deleteTask(id).pipe(
      tap(() => {
        this.toastService.showSuccess('Задача удалена');
        this.getTasks();
        this.removeTaskFromStore(id);
        this.formService.resetForm();
        this.router.navigate([ERoute.TASKS_BOARD]);
      }),
      catchError(e => {
        this.toastService.showError('Ошибка удаления задачи');
        console.error(e);
        return EMPTY;
      }),
      finalize(() => this.updateIsLoading(false))
    )
  }

  private confirmDelete() {
    const dialogRef = this.dialog.open(
      QuestionDialogComponent,
      {
        data: {
          header: 'Внимание!',
          text: 'Вы действительно хотите удалить задачу?',
          confirm: 'Да',
          cancel: 'Нет',
          hideCancelButton: false
        },
        width: '400px',
      }
    );
    return dialogRef.afterClosed();
  }

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
