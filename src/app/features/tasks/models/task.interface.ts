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
