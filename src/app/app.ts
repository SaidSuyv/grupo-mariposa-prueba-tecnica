import { Component, computed, inject, OnInit } from '@angular/core';
import { TaskStore } from './features/tasks/state/task.store'
import { ITask, StateType } from './features/tasks/models/task.interface';
import { ButtonModule } from 'primeng/button';
import { CreateNewTaskDialog } from "./features/tasks/dialogs/create-new-task.dialog/create-new-task.dialog";
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { AccordionModule } from 'primeng/accordion';
import { TaskItemComponent } from "./features/tasks/components/task-item.component/task-item.component";
import { ToastModule } from 'primeng/toast';
import { ConfirmDialog } from "primeng/confirmdialog";

@Component({
  selector: 'app-root',
  imports: [
    ButtonModule,
    CreateNewTaskDialog,
    DragDropModule,
    AccordionModule,
    TaskItemComponent,
    ToastModule,
    ConfirmDialog
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  taskStore = inject(TaskStore)

  readonly columns: StateType[] = ['backlog', 'in-progress', 'done']

  getListName(state: StateType) {
    return {
      'backlog': 'Por hacer',
      'in-progress': 'En progreso',
      'done': 'Hecho'
    }[state]
  }

  handleDrop(
    event: CdkDragDrop<ITask[]>,
    targetState: StateType
  ) {
    const task = event.item.data

    this.taskStore.moveTask(
      task.id,
      targetState,
      event.currentIndex
    )
  }
}
