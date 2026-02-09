import { SortField } from '@lib/components/filter-menu/sort-types';
import { ALL_TASK_KEYS } from '../types';

export const SORT_FIELDS: SortField[] = [
    { title: 'По дате создания', code: ALL_TASK_KEYS.createdAt },
    { title: 'По названию', code: ALL_TASK_KEYS.title },
    { title: 'По описанию', code: ALL_TASK_KEYS.description },
    { title: 'По приоритету', code: ALL_TASK_KEYS.priority },
    { title: 'По статусу', code: ALL_TASK_KEYS.status },
  ];
