import { ChangeDetectionStrategy, Component, effect, input, OutputRef } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {

  value = input<string | null>(null);

  constructor () {
    effect(() => {
      this.searchControl.setValue(this.value(), { emitEvent: false });
    });
  }

  protected searchControl = new FormControl<string>('');

  searchChanged: OutputRef<string | null> = outputFromObservable(
    this.searchControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged()
    )
  );

}
