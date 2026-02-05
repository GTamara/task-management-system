import { ChipConfig } from '@lib/components/chip/types';
import { EPriority } from '../types';

export const PRIORITY_CONFIG: Record<EPriority, ChipConfig> = {
  [EPriority.LOW]: {
    icon: 'arrow_downward',
    bgColor: '#05eeff',
    color: '#013134',
    label: 'Low'
  },
  [EPriority.MEDIUM]: {
    icon: 'schedule',
    bgColor: '#388E3C',
    color: '#FFE0B2',
    label: 'Medium'
  },
  [EPriority.HIGH]: {
    icon: 'arrow_upward',
    bgColor: '#F57C00',
    color: '#363a39',
    label: 'High'
  },
  [EPriority.URGENT]: {
    icon: 'priority_high',
    bgColor: '#D32F2F',
    color: '#E1BEE7',
    label: 'Urgent'
  }
};
