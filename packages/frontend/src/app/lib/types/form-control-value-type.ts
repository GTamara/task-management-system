import { FormControl } from '@angular/forms';

export type FormControlValueType<T> = T extends FormControl<infer U> ? U : never;
