import { Task } from '@features/tasks-board/types';

export type SortDirection = 'asc' | 'desc' | 'none';

export type SortCode = keyof Task;

export interface SortState {
  field: SortField;
  direction: SortDirection;
}

export type SortOption = SortField & { icon: string };

export interface SortField {
  title: string;
  code: SortCode;
}
