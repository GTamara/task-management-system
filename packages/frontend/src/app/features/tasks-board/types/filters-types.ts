import { DateRangeValues } from '@lib/components/date-range-filter/date-range-filter.types';
import { EPriority, EStatus } from '.';

export interface FiltersState {
  priority: EPriority | null;
  status: EStatus | null;
  createdAt: DateRangeValues | null;
}

