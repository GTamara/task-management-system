import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PRIORITY_CONFIG } from '@features/tasks-board/constants/priority-config';
import { STATUS_CONFIG } from '@features/tasks-board/constants/status-config';
import { TasksStoreService } from '@features/tasks-board/services/tasks-store-service/tasks-store.service';
import { TaskFormMode } from '@features/tasks-board/types/task-form';
import { FormConfigurableSelectComponent } from '@lib/components/form-configurable-select/form-configurable-select.component';

@Component({
  selector: 'app-task-form',
  imports: [
    FormConfigurableSelectComponent,

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
  protected form = this.store.taskForm;

  mode = input<TaskFormMode>();
  id = input<number>();

  STATUS_CONFIG = STATUS_CONFIG;
  PRIORITY_CONFIG = PRIORITY_CONFIG;

  submitForm () {
    this.store.createTask();
  }
}
