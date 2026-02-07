import { VisualEntityConfig } from '@lib/types/types';
import { EPriority } from '../types';

export const PRIORITY_CONFIG: Record<EPriority, VisualEntityConfig> = {
  [EPriority.LOW]: {
    icon: 'arrow_downward',
    bgColor: '#99f8fd',
    color: '#617374',
    label: 'Low',
    order: 1,
  },
  [EPriority.MEDIUM]: {
    icon: 'schedule',
    bgColor: '#93fdba',
    color: '#617374',
    label: 'Medium',
    order: 2,
  },
  [EPriority.HIGH]: {
    icon: 'arrow_upward',
    bgColor: '#fcc995',
    color: '#617374',
    label: 'High',
    order: 3,
  },
  [EPriority.URGENT]: {
    icon: 'priority_high',
    bgColor: '#fa6767',
    color: '#fff',
    label: 'Urgent',
    order: 4,
  }
};
