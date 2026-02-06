import { EPriority, EStatus } from '.';

export interface FiltersState {
  priority: EPriority | null;
  status: EStatus | null;
  date: string | null;
}

