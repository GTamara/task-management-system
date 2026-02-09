import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EPriority, EStatus } from '@features/tasks-board/types';
import { TaskFormGroup } from '@features/tasks-board/types/task-form';

@Injectable()
export class TaskFormService {

  private readonly fb = inject(FormBuilder);

  readonly taskForm: TaskFormGroup = this.getTaskForm();

  getTaskForm(): TaskFormGroup {
    return this.fb.group({
      title: this.fb.nonNullable.control<string>(
        '',
        [Validators.required, Validators.minLength(5)],
      ),
      description: this.fb.nonNullable.control<string>(''),

      priority: this.fb.control<EPriority | null>(null),
      status: this.fb.control<EStatus | null>(null),
    });
  }

  resetForm() {
    const titleControl = this.taskForm.controls.title;
    titleControl?.clearValidators();

    this.taskForm.reset({
      title: '',
      description: '',
      status: null,
      priority: null,
    });
    titleControl?.setValidators([Validators.required, Validators.minLength(5)]);
  }
}
