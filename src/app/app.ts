import { Component, computed, inject } from '@angular/core';
import { TaskManagerService } from 'features/tasks/state/task.store'
import { ITask } from 'features/tasks/models/task.interface'

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly taskManager = inject(TaskManagerService)
}
