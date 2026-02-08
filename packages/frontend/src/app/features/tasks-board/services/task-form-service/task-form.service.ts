import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EPriority, EStatus } from '@features/tasks-board/types';
import { TaskFormGroup } from '@features/tasks-board/types/task-form';

@Injectable()
export class TaskFormService {

  private readonly fb = inject(FormBuilder);

  getTaskForm(): TaskFormGroup {
    return this.fb.group({
      title: this.fb.nonNullable.control<string>(
        '',
        [Validators.required, Validators.maxLength(5)],
      ),
      description: this.fb.nonNullable.control<string>(''),

      priority: this.fb.control<EPriority | null>(null),
      status: this.fb.control<EStatus | null>(null),
    });
  }
}
