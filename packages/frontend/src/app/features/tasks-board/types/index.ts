import { createKeys } from '@lib/utils/check-all-keys';

export const ALL_TASK_KEYS = {
  ID: 'id',
  TITLE: 'title',
  DESCRIPTION: 'description',
  PRIORITY: 'priority',
  CREATED_AT: 'createdAt',
  STATUS: 'status',
} as const;

export interface Task {
  [ALL_TASK_KEYS.ID]: string;
  [ALL_TASK_KEYS.TITLE]: string;
  [ALL_TASK_KEYS.DESCRIPTION]: string;
  [ALL_TASK_KEYS.PRIORITY]: EPriority;
  [ALL_TASK_KEYS.CREATED_AT]: string;
  [ALL_TASK_KEYS.STATUS]: EStatus;
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
}

export enum EStatus {
  NEW = 'new',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
  REVIEW = 'review',
  BACKLOG = 'backlog',
}

