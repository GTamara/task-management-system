import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskFormMode } from '@features/tasks-board/types/task-form';

@Component({
  selector: 'app-task-form',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent {

  mode = input<TaskFormMode>();
  id = input<number>();

  onSubmit () {
    /**/
  }
}
