import { Component, input, ViewChild } from '@angular/core';
import { ITask, PriorityType } from '../../models/task.interface';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { EditTaskDialog } from "../../dialogs/edit-task.dialog/edit-task.dialog";

const PRIORITY_TITLE = {
  high: 'Prioridad Alta',
  medium: 'Prioridad Media',
  low: 'Prioridad Baja'
} as const;

const PRIORITY_SEVERITY = {
  high: 'danger',
  medium: 'info',
  low: 'success'
} as const;

@Component({
  selector: 'app-task-item-component',
  imports: [
    CardModule,
    TagModule,
    EditTaskDialog
],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {

  @ViewChild(EditTaskDialog) editTaskDialog!: EditTaskDialog;

  task = input.required<ITask>()

  getPriorityTitle(priority: PriorityType): (typeof PRIORITY_TITLE)[PriorityType]{
    return PRIORITY_TITLE[priority]
  }

  getPrioritySeverity(priority: PriorityType): (typeof PRIORITY_SEVERITY)[PriorityType] {
    return PRIORITY_SEVERITY[priority]
  }

  handleOpenTask(){
    this.editTaskDialog.showDialog()
  }

}
