import { ChangeDetectionStrategy, Component, input, OnInit, output, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { VisualEntityConfig } from '@lib/types/types';

export type FilterOption<T> = VisualEntityConfig & { value: T };
@Component({
  selector: 'app-dropdown-filter',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './dropdown-filter.component.html',
  styleUrl: './dropdown-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownFilterComponent<T extends string> implements OnInit {
  config = input.required<Record<T, VisualEntityConfig>>();
  value = input<T | null>(null);
  label = input.required<string>();

  newValueSelected = output<T | null>();

  protected options: FilterOption<T>[] = [];
  protected readonly selectedValue = signal<T | null>(null);

  ngOnInit(): void {
    this.options = this.getOptions<T>(this.config());
    this.selectedValue.set(this.value());
  }

  protected onValueSelected(newValue: T | null): void {
    this.newValueSelected.emit(newValue);
    this.selectedValue.set(newValue);
  }

  protected getSelectedLabel (value: string | null): string | null {
    if (!value) return null
    return this.options.find(opt => (opt.value === value))?.label ?? null
  }


  private getOptions<T extends string> (
    config: Record<T, VisualEntityConfig>
  ): FilterOption<T>[] {
    return Object.keys(config)
      .map(key => {
        const typedKey = key as T;
        return {
          value: typedKey,
          ...config[typedKey],
        };
      });
  }
}
