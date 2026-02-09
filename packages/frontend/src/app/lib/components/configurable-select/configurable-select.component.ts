import { ChangeDetectionStrategy, Component, effect, input, OnInit, output, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { VisualEntityConfig } from '@lib/types/types';

export type DropdownOption<T> = VisualEntityConfig & { value: T };
@Component({
  selector: 'app-configurable-select',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './configurable-select.component.html',
  styleUrl: './configurable-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurableSelectComponent<T extends string> implements OnInit {
  config = input.required<Record<T, VisualEntityConfig>>();
  value = input<T | null>(null);
  label = input.required<string>();
  labelIcon = input<string>();
  isDisabled = input<boolean>(false);

  newValueSelected = output<T | null>();

  protected options: DropdownOption<T>[] = [];
  protected readonly selectedValue = signal<T | null>(null);

  constructor () {
    effect(() => {
      this.selectedValue.set(this.value());
    });
  }

  ngOnInit(): void {
    this.options = this.getOptions<T>(this.config());
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
  ): DropdownOption<T>[] {
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
