export interface Task {
  id: string;
  title: string;
  description: string;
  priority: EPriotity;
  creationDate: string;
  status: EStatus;
}

export enum EPriotity {
  LOW = 'low',
  MEDIUM = 'medium',
  LARGE = 'large',
  URGENT = 'urgent',
}

export enum EStatus {
  TO_DO = 'to-do',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
  REVIEW = 'review',
  BACKLOG = 'backlog',
}
