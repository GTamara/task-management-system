import { ChangeDetectionStrategy, Component, inject, OutputRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { DateRangeValues } from './date-range-filter.types';
import { debounceTime, distinctUntilChanged } from 'rxjs';

type DateRangeFormFroup = FormGroup<{
  startDate: FormControl<Date | null>;
  endDate: FormControl<Date | null>;
}>;

@Component({
  selector: 'app-date-range-filter',
  imports: [
    ReactiveFormsModule,

    MatFormFieldModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './date-range-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangeFilterComponent {

  private readonly fb = inject(FormBuilder);

  protected readonly rangeForm: DateRangeFormFroup = this.fb.group({
    startDate: this.fb.control<Date | null>(null),
    endDate: this.fb.control<Date | null>(null),
  });

  dateRangeChanged: OutputRef<Partial<DateRangeValues>> = outputFromObservable(
    this.rangeForm.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged()
    )
  );
}
