import { Injectable, signal } from '@angular/core';
import { ITask } from '../shared/interfaces/task.interface'

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService {

  public aTasks = signal<ITask[]>([])

  create(data: ITask){
    this.aTasks.update(
      (tasks: ITask[]) => [...tasks, data]
    )
  }

  edit(id: number, data: ITask){
    this.aTask.update(
      (tasks: ITask[]) => tasks.map(
        task => {
          if(task.id === id) return { id, ...data }
          else return task
        }
      )
    )
  }

  remove(id: number){
    this.aTasks.update(
      (tasks: ITask[]) =>
        tasks.filter( t => id !== t.id )
    )
  }

}
