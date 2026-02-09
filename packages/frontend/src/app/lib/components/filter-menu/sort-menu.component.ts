import { Component, computed, input, OnInit, output, Signal, signal, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SortCode, SortField, SortOption, SortState } from './sort-types';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sort-menu',
  imports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './sort-menu.component.html',
})
export class SortMenuComponent implements OnInit {

  fields = input.required<SortField[]>();
  sortChanged = output<SortState>();
  defaultSortFiled = input.required<SortField>();

  sortState: WritableSignal<SortState> = signal({} as SortState);

  ngOnInit(): void {
    const defaultSortField = this.fields()[0];
    this.sortState.set({
      field: defaultSortField,
      direction: 'desc',
    });
  }

  protected readonly optionsSignal: Signal<SortOption[]> = computed(() => {
    const fields: SortField[] = this.fields();
    const sortState = this.sortState();
    const options = fields.map((field) => ({
      ...field,
      icon: this.getSortIcon(field.code, sortState),
    }));
    return options;
  });

  getSortIcon(field: SortCode, sort: SortState): string {
    if (sort.field.code !== field) {
      return 'unfold_more';
    }
    return sort.direction === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }

  handleChangeSort(field: SortField): void {
    const sort = { ...this.sortState() };
    if (sort.field.code === field.code) {
      // Переключение направления, если поле то же
      sort.direction =
        sort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      // Новое поле, сбрасываем направление
      sort.field = field;
      sort.direction = 'asc';
    }
    this.sortState.set(sort);
    this.sortChanged.emit(sort);
  }
}
