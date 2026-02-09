import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { PRIORITY_CONFIG } from '@features/tasks-board/constants/priority-config';
import { STATUS_CONFIG } from '@features/tasks-board/constants/status-config';
import { TasksStoreService } from '@features/tasks-board/services/tasks-store-service/tasks-store.service';
import { Task } from '@features/tasks-board/types';
import { TaskFormMode } from '@features/tasks-board/types/task-form';
import { ConfigurableSelectComponent } from '@lib/components/configurable-select/configurable-select.component';
import { FormControlValueType } from '@lib/types/form-control-value-type';
import { ERoute } from '@routing/types';
@Component({
  imports: [
    ConfigurableSelectComponent,

    ReactiveFormsModule,

    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent {

  private readonly store = inject(TasksStoreService);
  private readonly router = inject(Router);
  protected form = this.store.taskForm;

  mode = input<TaskFormMode>();
  id = input<string>();

  STATUS_CONFIG = STATUS_CONFIG;
  PRIORITY_CONFIG = PRIORITY_CONFIG;

  constructor() {
    effect(() => {
      const task = this.taskItem();
      const mode = this.mode();

      switch (mode) {
        case 'new':
          this.clearForm();
          this.form.enable();
          break;
        case 'view':
          this.form.disable();
          !!task && this.fillForm(task);
          break;
        case 'edit':
          this.form.enable();
          !!task && this.fillForm(task);
          break;
      }
    });
  }

  protected taskItem = computed(() => {
    const taskId = this.id();

    if (!taskId) return;
    return this.store.selectTaskByIdSignal(taskId);
  });

  protected formTitles = computed(() => {
    const mode = this.mode();

    if (!mode) {
      console.error(`Mode ${mode} is not supported`);
      return {};
    }

    switch (mode) {
      case 'new':
        return {
          formTitle: 'Новая задача',
          submitBtnTitle: 'Создать задачу'
        };
      case 'view':
        return {
          formTitle: 'Просмотр задачи',
        };
      case 'edit':
        return {
          formTitle: 'Редактирование задачи',
          submitBtnTitle: 'Сохранить изменения'
        };
    }
  });

  protected onDropdownValueSelected<T>(
    control: T,
    value: FormControlValueType<T>
  ): void {
    /*
     * или можно изменить тип функции на onDropdownValueSelected<T rxtends FormControl>,
     * тогда не нужен будет if
     */
    if (control instanceof FormControl) {
      control.setValue(value);
      control.markAsTouched();
    }
  }

  protected submitForm() {
    const mode = this.mode();

    switch (mode) {
      case 'new':
        this.store.createTask();
        break;
      case 'edit': {
        const id = this.id();
        !!id && this.store.editTask(id);
        break;
      }
    }

  }

  protected deleteTask () {
    const id = this.id();
    if (!id) return;
    this.store.deleteTask(id);
  }

  protected switchOnEditMode () {
    this.router.navigate([ERoute.TASKS_BOARD, this.id(), 'edit']);
  }

  private fillForm(task: Task) {
    this.form.patchValue(task);
  }

  private clearForm() {
    this.form.reset({
      title: '',
      description: '',
      status: null,
      priority: null
    });
  }
}
