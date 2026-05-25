import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { ITask, TaskPriorityType, TaskStateType } from '../models/task.interface'
import { STORAGE_KEY } from '../../../core/tokens/storage.token';

@Injectable({
  providedIn: 'root',
})
export class TaskStore {

  private readonly storageKey = inject(STORAGE_KEY)
  private readonly _tasks = signal<ITask[]>([])

  readonly tasks = this._tasks.asReadonly()

  private readonly _activeFilter = signal<Record<TaskStateType, TaskPriorityType | null>>({
    'backlog': null,
    'in-progress': null,
    'done': null,
  })

  readonly activeFilter = this._activeFilter.asReadonly()

  readonly groupedTasks = computed(() => {
    const grouped: Record<TaskStateType, ITask[]> = {
      'backlog': [],
      'in-progress': [],
      'done': []
    }

    const filter = this._activeFilter()

    for (const task of this._tasks()) {
      if (filter[task.state] && task.priority !== filter[task.state]) {
        continue;
      }
      grouped[task.state].push(task);
    }

    for (const key in grouped) {
      grouped[key as TaskStateType].sort(
        (a, b) => a.order - b.order
      );
    }
    return grouped;
  })

  constructor() {
    this.loadTasks()
    effect(
      () => {
        localStorage.setItem(this.storageKey, JSON.stringify(this._tasks()))
      }
    )
  }

  private loadTasks() {
    try {
      const stored = localStorage.getItem(this.storageKey)
      if (!stored) {
        localStorage.setItem(this.storageKey, JSON.stringify([]))
        this._tasks.set([])
        return
      }
      const stored_tasks: ITask[] = JSON.parse(stored).map((task: any) => {
        return {
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt)
        }
      })
      this._tasks.set(stored_tasks)
    }
    catch (error) {
      localStorage.setItem(this.storageKey, JSON.stringify([]))
      this._tasks.set([])
    }
  }

  addTask(name: string, description: string | null, priority: TaskPriorityType) {
    if (!name || name.trim().length === 0) return
    if (description && description.trim().length === 0) description = null

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
    if (!data.name || data.name.trim().length === 0) return
    if (data.description && data.description.trim().length === 0) data.description = null

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
    targetState: TaskStateType,
    targetIndex: number
  ) {
    if (targetIndex > this.groupedTasks()[targetState].length || targetIndex < 0) return

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

  filterTasksByPriority(state: TaskStateType, priority: TaskPriorityType) {
    this._activeFilter.update(
      (filters: Record<TaskStateType, TaskPriorityType | null>) => ({
        ...filters,
        [state]: filters[state] === priority ? null : priority
      })
    )
  }

  resetFilter(state: TaskStateType) {
    this._activeFilter.update(
      (filters: Record<TaskStateType, TaskPriorityType | null>) => ({
        ...filters,
        [state]: null
      })
    )
  }

}
