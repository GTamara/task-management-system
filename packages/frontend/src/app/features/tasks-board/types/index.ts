import { createKeys } from '@lib/utils/check-all-keys';

export const ALL_TASK_KEYS = {
  id: 'id',
  title: 'title',
  description: 'description',
  priority: 'priority',
  createdAt: 'createdAt',
  status: 'status',
} as const;

export type Task = {
  [ALL_TASK_KEYS.id]: string;
  [ALL_TASK_KEYS.title]: string;
  [ALL_TASK_KEYS.description]: string;
  [ALL_TASK_KEYS.priority]: EPriority;
  [ALL_TASK_KEYS.createdAt]: string;
  [ALL_TASK_KEYS.status]: EStatus;
}

export const TASK_KEYS_CACHE = new Set<keyof Task>(
  createKeys<Task>()(
    'id',
    'title',
    'description',
    'priority',
    'createdAt',
    'status'
  )
);

export function isTaskKeyGuard(key: unknown): key is keyof Task {
  return typeof key === 'string' && TASK_KEYS_CACHE.has(key as keyof Task);
}

export enum EPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
  NONE = 'none',
}

export enum EStatus {
  NEW = 'new',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
  REVIEW = 'review',
  BACKLOG = 'backlog',
  NONE = 'none',
}

