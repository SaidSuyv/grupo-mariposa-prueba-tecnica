export interface ITask {
  id: number;
  name: string;
  description: string;
  priority: 'H' | 'M' | 'L';
}
