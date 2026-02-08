import { VisualEntityConfig } from '@lib/types/types';
import { EStatus } from '../types';

export const STATUS_CONFIG: Record<EStatus, VisualEntityConfig> = {
  [EStatus.BACKLOG]: {
    icon: 'inventory_2',
    color: '#757575',
    bgColor: '#F5F5F5',
    label: 'Backlog',
    order: 1
  },
  [EStatus.NEW]: {
    icon: 'fiber_new',
    color: '#1976D2',
    bgColor: '#E3F2FD',
    label: 'New',
    order: 2
  },
  [EStatus.IN_PROGRESS]: {
    icon: 'autorenew',
    color: '#c26403',
    bgColor: '#fffece',
    label: 'In Progress',
    order: 3
  },
  [EStatus.REVIEW]: {
    icon: 'visibility',
    color: '#7B1FA2',
    bgColor: '#F3E5F5',
    label: 'Review',
    order: 4
  },
  [EStatus.DONE]: {
    icon: 'check_circle',
    color: '#388E3C',
    bgColor: '#E8F5E9',
    label: 'Done',
    order: 5
  },
  [EStatus.NONE]: {
    icon: 'remove',
    bgColor: '#fff',
    color: '#617374',
    label: 'None',
    order: 6
  }
};
