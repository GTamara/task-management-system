import { FiltersState } from '../types/filters-types';

export const DEFAULT_FILTERS_STATE: FiltersState = {
  priority: null,
  status: null,
  createdAt: {
    startDate: null,
    endDate: null,
  },
  search: null,
}
