import { VisualEntityConfig } from '@lib/types/types';
import { EPriority } from '../types';

export const PRIORITY_CONFIG: Record<EPriority, VisualEntityConfig> = {
  [EPriority.LOW]: {
    icon: 'arrow_downward',
    bgColor: '#99f8fd',
    color: '#617374',
    label: 'Low'
  },
  [EPriority.MEDIUM]: {
    icon: 'schedule',
    bgColor: '#93fdba',
    color: '#617374',
    label: 'Medium'
  },
  [EPriority.HIGH]: {
    icon: 'arrow_upward',
    bgColor: '#fcc995',
    color: '#617374',
    label: 'High'
  },
  [EPriority.URGENT]: {
    icon: 'priority_high',
    bgColor: '#fa67bc',
    color: '#3b4647',
    label: 'Urgent'
  }
};
