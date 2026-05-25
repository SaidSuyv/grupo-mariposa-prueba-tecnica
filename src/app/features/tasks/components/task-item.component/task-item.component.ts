import { ChangeDetectionStrategy, Component, computed, inject, input, ViewChild } from '@angular/core';
import { ITask, PRIORITY_SEVERITY, PRIORITY_TITLE } from '../../models/task.interface';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { EditTaskDialog } from "../../dialogs/edit-task.dialog/edit-task.dialog";
import { ButtonModule } from "primeng/button";
import { DividerModule } from 'primeng/divider';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TaskStore } from '../../state/task.store';

@Component({
  selector: 'app-task-item-component',
  imports: [
    CardModule,
    TagModule,
    EditTaskDialog,
    ButtonModule,
    DividerModule
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {

  @ViewChild(EditTaskDialog) editTaskDialog!: EditTaskDialog;

  private readonly confirmationService = inject(ConfirmationService)
  private readonly taskStore = inject(TaskStore)
  private readonly messageService = inject(MessageService)

  task = input.required<ITask>()
  priorityTitle = computed(() => PRIORITY_TITLE[this.task().priority])
  prioritySeverity = computed(() => PRIORITY_SEVERITY[this.task().priority])
  createdAt = computed(() => this.task().createdAt.toLocaleString())
  updatedAt = computed(() => this.task().updatedAt.toLocaleString())

  handleOpenEditDialog() {
    this.editTaskDialog.showDialog()
  }

  handleRemove() {
    this.confirmationService.confirm({
      message: '¿Estas seguro de eliminar la tarea?',
      header: 'Eliminar tarea',
      icon: 'pi pi-trash',
      closable: false,
      defaultFocus: 'reject',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonProps: {
        severity: 'danger',
        icon: 'pi pi-trash',
      },
      rejectButtonProps: {
        severity: 'secondary',
        icon: 'pi pi-times',
        label: 'Cancelar'
      },
      accept: () => {
        this.taskStore.removeTask(this.task().id)
        this.messageService.add({ severity: 'success', summary: 'Tarea eliminada', detail: 'La tarea se ha eliminado correctamente' })
      }
    })
  }

}
