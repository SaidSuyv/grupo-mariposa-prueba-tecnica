export interface ITask {
  id: string;
  name: string;
  description: string;
  priority: PriorityType;
  state: StateType;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export type PriorityType = 'high' | 'medium' | 'low'
export type StateType = 'backlog' | 'in-progress' | 'done'

export const PRIORITY_TITLE = {
  high: 'Prioridad Alta',
  medium: 'Prioridad Media',
  low: 'Prioridad Baja'
} as const;

export const PRIORITY_SEVERITY = {
  high: 'danger',
  medium: 'info',
  low: 'success'
} as const;