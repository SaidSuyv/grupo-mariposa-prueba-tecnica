import { Component, computed, inject, OnInit } from '@angular/core';
import { TaskStore } from './features/tasks/state/task.store'
import { ITask, StateType } from './features/tasks/models/task.interface';
import { ButtonModule } from 'primeng/button';
import { CreateNewTaskDialog } from "./features/tasks/dialogs/create-new-task.dialog/create-new-task.dialog";
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
// import { CdkScrollable } from '@angular/cdk/scrolling';
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
    // CdkScrollable,
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

  dragStartDelay = 0;
  private isMouseDown = false;
  private startX = 0;
  private scrollLeft = 0;

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

  onMouseDown(event: MouseEvent, container: HTMLElement) {
    const target = event.target as HTMLElement;
    if (target.closest('[cdkDrag]') || target.closest('button, input, select, textarea, a, p-accordion-header')) {
      return;
    }
    this.isMouseDown = true;
    container.style.cursor = 'grabbing';
    container.style.userSelect = 'none';
    this.startX = event.pageX - container.offsetLeft;
    this.scrollLeft = container.scrollLeft;
  }

  onMouseMove(event: MouseEvent, container: HTMLElement) {
    if (!this.isMouseDown) return;
    event.preventDefault();
    const x = event.pageX - container.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    container.scrollLeft = this.scrollLeft - walk;
  }

  onMouseUp(container: HTMLElement) {
    this.isMouseDown = false;
    container.style.cursor = '';
    container.style.userSelect = '';
  }

  onMouseLeave(container: HTMLElement) {
    this.isMouseDown = false;
    container.style.cursor = '';
    container.style.userSelect = '';
  }
}

