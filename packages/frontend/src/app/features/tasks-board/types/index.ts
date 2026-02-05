export interface Task {
  id: string;
  title: string;
  description: string;
  priority: EPriority;
  creationDate: string;
  status: EStatus;
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

