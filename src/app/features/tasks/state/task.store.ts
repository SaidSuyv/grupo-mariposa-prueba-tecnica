import { computed, effect, Injectable, signal } from '@angular/core';
import { ITask, PriorityType, StateType } from '../models/task.interface'

@Injectable({
  providedIn: 'root',
})
export class TaskStore {

  private readonly _tasks = signal<ITask[]>([])

  readonly tasks = this._tasks.asReadonly()

  readonly groupedTasks = computed(() => {
    const grouped: Record<StateType, ITask[]> = {
      'backlog': [],
      'in-progress': [],
      'done': []
    }

    for (const task of this._tasks()) {
      grouped[task.state].push(task)
    }

    for (const key in grouped) {
      grouped[key as StateType].sort(
        (a, b) => a.order - b.order
      )
    }
    return grouped
  })

  constructor() {
    this.loadTasks()
    effect(
      () => {
        localStorage.setItem('pruebatecnica_tasks', JSON.stringify(this._tasks()))
      }
    )
  }

  private loadTasks() {
    try {
      const stored = localStorage.getItem('pruebatecnica_tasks')
      if (!stored) return
      const stored_tasks: ITask[] = JSON.parse(stored)
      this._tasks.set(stored_tasks)
    }
    catch (error) {
      console.error('Error recargando tasks', error)
      this._tasks.set([])
    }
  }

  addTask(name: string, description: string, priority: PriorityType) {
    const backlog = this.groupedTasks().backlog
    const order = backlog.length ? backlog[backlog.length - 1].order + 1 : 0

    const task: ITask = {
      id: crypto.randomUUID(),
      name,
      description,
      priority,
      state: 'backlog',
      order,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    this._tasks.update((tasks: ITask[]) => [...tasks, task])
  }

  editTask(id: string, data: Partial<ITask>) {
    this._tasks.update(
      (tasks: ITask[]) => tasks.map(
        task => {
          if (task.id === id) {
            return {
              ...task,
              name: data.name!,
              description: data.description!,
              priority: data.priority!,
              updatedAt: new Date()
            }
          }
          else return task
        }
      )
    )
  }

  removeTask(id: string) {
    this._tasks.update(
      (tasks: ITask[]) =>
        tasks.filter(t => id !== t.id)
    )
  }

  moveTask(
    taskId: string,
    targetState: StateType,
    targetIndex: number
  ) {
    const tasks = [...this._tasks()]

    const task = tasks.find(t => t.id === taskId)

    if (!task) return

    const sourceState = task.state

    if (sourceState === targetState) {
      const stateTasks = tasks
        .filter(t => t.state === sourceState)
        .sort((a, b) => a.order - b.order)

      const sourceIndex = stateTasks.findIndex(t => t.id === taskId)
      if (sourceIndex !== -1) {
        stateTasks.splice(sourceIndex, 1)
        stateTasks.splice(targetIndex, 0, task)
        stateTasks.forEach((t, i) => { t.order = i })
      }
    } else {
      const sourceTasks = tasks
        .filter(t => t.state === sourceState)
        .sort((a, b) => a.order - b.order)

      const targetTasks = tasks
        .filter(t => t.state === targetState)
        .sort((a, b) => a.order - b.order)

      const sourceIndex = sourceTasks.findIndex(t => t.id === taskId)
      if (sourceIndex !== -1) {
        sourceTasks.splice(sourceIndex, 1)
        task.state = targetState
        targetTasks.splice(targetIndex, 0, task)
        sourceTasks.forEach((t, i) => { t.order = i })
        targetTasks.forEach((t, i) => { t.order = i })
      }
    }

    this._tasks.set([...tasks])
  }

}
