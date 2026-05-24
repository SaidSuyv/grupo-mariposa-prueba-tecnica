import { ChangeDetectionStrategy, Component, computed, input, ViewChild } from '@angular/core';
import { ITask, PRIORITY_SEVERITY, PRIORITY_TITLE } from '../../models/task.interface';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {

  @ViewChild(EditTaskDialog) editTaskDialog!: EditTaskDialog;
  @ViewChild(ViewTaskDialog) viewTaskDialog!: ViewTaskDialog;

  task = input.required<ITask>()
  priorityTitle = computed(() => PRIORITY_TITLE[this.task().priority])
  prioritySeverity = computed(() => PRIORITY_SEVERITY[this.task().priority])

  handleOpenViewDialog() {
    this.viewTaskDialog.showDialog()
  }

  handleOpenEditDialog() {
    this.editTaskDialog.showDialog()
  }

}
