import { Component, inject, input, output, signal, ViewChild } from '@angular/core';
import { DialogModule } from 'primeng/dialog'
import { ITask } from '../../models/task.interface';
import { TaskForm } from "../../forms/task.form/task.form";
import { TaskStore } from '../../state/task.store';

@Component({
  selector: 'app-edit-task-dialog',
  imports: [
    DialogModule,
    TaskForm
],
  templateUrl: './edit-task.dialog.html',
  styleUrl: './edit-task.dialog.css',
})
export class EditTaskDialog {

  @ViewChild(TaskForm) taskForm!: TaskForm

  private readonly taskStore = inject(TaskStore)

  task = input.required<ITask>()
  onClose = output<void>()

  isDialogVisible = signal<boolean>(false)

  showDialog(){
    this.isDialogVisible.set(true)
    this.taskForm.reset()
  }

  hideDialog(){
    this.isDialogVisible.set(false)
  }

  handleSubmit(task: Partial<ITask>) {
    const id = task.id!
    const name = task.name!
    const description = task.description!
    const priority = task.priority!

    this.taskStore.editTask(id, { name, description, priority })

    this.hideDialog()
  }

}
