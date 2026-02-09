import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PRIORITY_CONFIG } from '@features/tasks-board/constants/priority-config';
import { SORT_FIELDS } from '@features/tasks-board/constants/sort-fields';
import { STATUS_CONFIG } from '@features/tasks-board/constants/status-config';
import { ALL_TASK_KEYS, EPriority, EStatus } from '@features/tasks-board/types';
import { FiltersState } from '@features/tasks-board/types/filters-types';
import { DateRangeFilterComponent } from '@lib/components/date-range-filter/date-range-filter.component';
import { DateRangeValues } from '@lib/components/date-range-filter/date-range-filter.types';
import { ConfigurableSelectComponent } from '@lib/components/configurable-select/configurable-select.component';
import { SortMenuComponent } from '@lib/components/filter-menu/sort-menu.component';
import { SortState } from '@lib/components/filter-menu/sort-types';
import { SearchComponent } from '@lib/components/search/search.component';
import { DEFAULT_FILTERS_STATE } from '@features/tasks-board/constants/default-filters-state';
@Component({
  selector: 'app-tasks-filters',
  imports: [
    ConfigurableSelectComponent,
    DateRangeFilterComponent,
    SearchComponent,
    SortMenuComponent,

    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './tasks-filters.component.html',
  styleUrl: './tasks-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksFiltersComponent {

  readonly sortState: SortState = {
    field: {
      title: 'Дата создания',
      code: ALL_TASK_KEYS.createdAt,
    },
    direction: 'none',
  } as SortState

  filtersState = input<FiltersState>(DEFAULT_FILTERS_STATE);
  filtersStateChanged = output<Partial<FiltersState>>();
  sortStateChanged = output<SortState>();

  STATUS_CONFIG = STATUS_CONFIG;
  PRIORITY_CONFIG = PRIORITY_CONFIG;
  ALL_TASK_KEYS = ALL_TASK_KEYS;
  SORT_FIELDS = SORT_FIELDS;

  protected newStatusSelected(status: EStatus | null): void {
    this.filtersStateChanged.emit({ status });
  }

  protected newPrioritySelected(priority: EPriority | null): void {
    this.filtersStateChanged.emit({ priority });
  }

  protected resetAllFilters(): void {
    this.filtersStateChanged.emit(DEFAULT_FILTERS_STATE);
  }

  protected newDateRangeSelected(evt: Partial<DateRangeValues>): void {
    this.filtersStateChanged.emit({
      createdAt: {
        startDate: evt.startDate ?? null,
        endDate: evt.endDate ?? null,
      }
    });
  }

  protected searchChanged(search: string | null): void {
    this.filtersStateChanged.emit({ search });
  }

  protected sortTasks(sortState: SortState): void {
    this.sortStateChanged.emit(sortState);
  }
}
