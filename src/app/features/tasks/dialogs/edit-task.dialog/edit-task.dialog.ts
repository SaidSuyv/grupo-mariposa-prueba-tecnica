import { ChangeDetectionStrategy, Component, inject, input, output, signal, ViewChild } from '@angular/core';
import { DialogModule } from 'primeng/dialog'
import { ITask } from '../../models/task.interface';
import { TaskForm } from "../../forms/task.form/task.form";
import { TaskStore } from '../../state/task.store';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-task-dialog',
  imports: [
    DialogModule,
    TaskForm
  ],
  templateUrl: './edit-task.dialog.html',
  styleUrl: './edit-task.dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTaskDialog {

  @ViewChild(TaskForm) taskForm!: TaskForm

  private readonly taskStore = inject(TaskStore)
  private readonly messageService = inject(MessageService)

  task = input.required<ITask>()
  onClose = output<void>()

  isDialogVisible = signal<boolean>(false)

  showDialog() {
    this.isDialogVisible.set(true)
    this.taskForm.reset()
  }

  hideDialog() {
    this.isDialogVisible.set(false)
    this.onClose.emit()
  }

  handleSubmit(task: Partial<ITask>) {
    const id = task.id!
    const name = task.name!
    const description = task.description!
    const priority = task.priority!

    this.taskStore.editTask(id, { name, description, priority })
    this.messageService.add({ severity: 'success', summary: 'Tarea editada', detail: 'La tarea se ha editado correctamente' })
    this.hideDialog()
  }

}
