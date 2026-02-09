import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { EStatus, Task } from '../../types';
import { ERoute } from '../../../../routing/types';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { PRIORITY_CONFIG } from '@features/tasks-board/constants/priority-config';
import { ChipComponent } from '@lib/components/chip/chip.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { STATUS_CONFIG } from '@features/tasks-board/constants/status-config';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-task-item',
  imports: [
    ChipComponent,

    DatePipe,

    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {

  taskData = input.required<Task>();
  isSelected = input<boolean>(false);

  protected readonly EStatus = EStatus
  protected readonly ERoute = ERoute;
  protected readonly PRIORITY_CONFIG = PRIORITY_CONFIG;
  protected readonly STATUS_CONFIG = STATUS_CONFIG;
}
