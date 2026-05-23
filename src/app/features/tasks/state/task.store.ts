import { Injectable, signal } from '@angular/core';
import { ITask } from '../shared/interfaces/task.interface'

@Injectable({
  providedIn: 'root',
})
export class TaskStore {

  private readonly _tasks = signal<ITask[]>([])

  readonly tasks = this._tasks.asReadonly()

  readonly backlogTasks = computed(
    () =>
      this._tasks()
      .filter( t => t.state === 'backlog' )
  )

  readonly inProgressTasks = computed(
    () =>
      this._tasks().filter( t => t.state === 'progress' )
  )

  readonly doneTasks = computed(
    () =>
      this._tasks().filter( t => t.state === 'done' )
  )

  create(data: ITask){
    this._tasks.update(
      (tasks: ITask[]) => [...tasks, data]
    )
  }

  edit(id: number, data: ITask){
    this._tasks.update(
      (tasks: ITask[]) => tasks.map(
        task => {
          if(task.id === id) return { id, ...data }
          else return task
        }
      )
    )
  }

  remove(id: number){
    this._tasks.update(
      (tasks: ITask[]) =>
        tasks.filter( t => id !== t.id )
    )
  }

}
