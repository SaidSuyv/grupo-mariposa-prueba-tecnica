import { Component, input, ViewChild } from '@angular/core';
import { ITask, PRIORITY_SEVERITY, PRIORITY_TITLE, PriorityType } from '../../models/task.interface';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { EditTaskDialog } from "../../dialogs/edit-task.dialog/edit-task.dialog";
import { ViewTaskDialog } from "../../dialogs/view-task.dialog/view-task.dialog";

@Component({
  selector: 'app-task-item-component',
  imports: [
    CardModule,
    TagModule,
    EditTaskDialog,
    ViewTaskDialog
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {

  @ViewChild(EditTaskDialog) editTaskDialog!: EditTaskDialog;
  @ViewChild(ViewTaskDialog) viewTaskDialog!: ViewTaskDialog;

  task = input.required<ITask>()

  getPriorityTitle(priority: PriorityType): (typeof PRIORITY_TITLE)[PriorityType] {
    return PRIORITY_TITLE[priority]
  }

  getPrioritySeverity(priority: PriorityType): (typeof PRIORITY_SEVERITY)[PriorityType] {
    return PRIORITY_SEVERITY[priority]
  }

  handleOpenViewDialog() {
    this.viewTaskDialog.showDialog()
  }

  handleOpenEditDialog() {
    this.editTaskDialog.showDialog()
  }

}
