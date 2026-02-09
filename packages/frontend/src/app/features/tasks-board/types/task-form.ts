import { FormControl, FormGroup } from '@angular/forms';
import { EPriority, EStatus } from '.';

export type TaskFormMode = 'new' | 'edit' | 'view';

export type TaskFormGroup = FormGroup<{
    title: FormControl<string>;
    description: FormControl<string>;
    priority: FormControl<EPriority | null>;
    status: FormControl<EStatus | null>;
}>
