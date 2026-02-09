import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ConfigurableSelectComponent } from '../configurable-select/configurable-select.component';
import { VisualEntityConfig } from '@lib/types/types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-configurable-select',
  imports: [
    ConfigurableSelectComponent,

    ReactiveFormsModule,

    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './form-configurable-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormConfigurableSelectComponent<T extends string> {

  control = input.required<FormControl<T | null>>();

  config = input.required<Record<T, VisualEntityConfig>>();
  // value = input<T | null>(null);
  label = input.required<string>();
  labelIcon = input<string>();

  // currentControlValue = toSignal(
  //   this.control().valueChanges.pipe(
  //     startWith(null)
  //   ),
  //   { injector: inject(Injector), requireSync: true }
  // );

  protected onValueSelected(newValue: T | null): void {
    const formControl = this.control();
    formControl.setValue(newValue);
    formControl.markAsTouched();
  }
}
