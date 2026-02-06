export interface VisualEntityConfig {
  icon: string;
  color: string;
  bgColor: string;
  label?: string;
  order?: number;
}

export type FilterOption<T> = VisualEntityConfig & { value: T };
