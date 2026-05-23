export interface ITask {
  id: number;
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  state: 'backlog' | 'progress' | 'done';
}
