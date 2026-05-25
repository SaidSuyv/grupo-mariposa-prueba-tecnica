export interface ITask {
  id: string;
  name: string;
  description: string | null;
  priority: TaskPriorityType;
  state: TaskStateType;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskPriorityType = 'high' | 'medium' | 'low' | 'none';
export type TaskStateType = 'backlog' | 'in-progress' | 'done';

export const PRIORITY_TITLE = {
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
  none: 'Sin prioridad'
} as const;

export const PRIORITY_SEVERITY = {
  high: 'danger',
  medium: 'warn',
  low: 'success',
  none: 'secondary'
} as const;