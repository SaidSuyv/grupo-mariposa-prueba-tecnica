import { Component, inject, input, output, signal } from '@angular/core';
import { ITask, PRIORITY_SEVERITY, PRIORITY_TITLE, PriorityType } from '../../models/task.interface';
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { TagModule } from "primeng/tag";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TaskStore } from '../../state/task.store';

@Component({
  selector: 'app-view-task-dialog',
  imports: [
    CardModule,
    ButtonModule,
    DialogModule,
    TagModule,
    ConfirmDialogModule
  ],
  templateUrl: './view-task.dialog.html',
  styleUrl: './view-task.dialog.css',
})
export class ViewTaskDialog {

  private readonly confirmationService = inject(ConfirmationService)
  private readonly messageService = inject(MessageService)
  private readonly taskStore = inject(TaskStore)

  task = input.required<ITask>();

  onEdit = output<void>()

  isDialogVisible = signal<boolean>(false)

  showDialog() {
    this.isDialogVisible.set(true)
  }

  hideDialog() {
    this.isDialogVisible.set(false)
  }

  getPriorityTitle(priority: PriorityType): (typeof PRIORITY_TITLE)[PriorityType] {
    return PRIORITY_TITLE[priority]
  }

  getPrioritySeverity(priority: PriorityType): (typeof PRIORITY_SEVERITY)[PriorityType] {
    return PRIORITY_SEVERITY[priority]
  }

  handleEdit() {
    this.onEdit.emit()
    this.hideDialog()
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
        this.hideDialog()
      }
    })
  }

}
