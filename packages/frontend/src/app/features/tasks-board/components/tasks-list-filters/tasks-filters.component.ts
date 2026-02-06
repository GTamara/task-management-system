import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PRIORITY_CONFIG } from '@features/tasks-board/constants/priority-config';
import { STATUS_CONFIG } from '@features/tasks-board/constants/status-config';
import { EPriority, EStatus } from '@features/tasks-board/types';
import { FiltersState } from '@features/tasks-board/types/filters-types';
import { DropdownFilterComponent } from '@lib/components/dropdown-filter/dropdown-filter.component';

@Component({
  selector: 'app-tasks-filters',
  imports: [
    DropdownFilterComponent,
    MatButtonModule,
  ],
  templateUrl: './tasks-filters.component.html',
  styleUrl: './tasks-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksFiltersComponent {

  initState = input<FiltersState>({
    priority: null,
    status: null,
    date: null
  });

  filtersStateChanged = output<Partial<FiltersState>>();

  STATUS_CONFIG = STATUS_CONFIG;
  PRIORITY_CONFIG = PRIORITY_CONFIG;

  protected newStatusSelected (status: EStatus | null): void {
    this.filtersStateChanged.emit({ status });
  }

  protected newPrioritySelected (priority: EPriority | null): void {
    this.filtersStateChanged.emit({ priority });
  }

  protected resetAllFilters (): void {
    this.filtersStateChanged.emit({ priority: null, status: null, date: null });
  }
}
