import { ChangeDetectionStrategy, Component, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { TaskStore } from '../../state/task.store';
import { ITask, PriorityType, StateType } from '../../models/task.interface';
import { TaskForm } from "../../forms/task.form/task.form";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-new-task-dialog',
  imports: [
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    FloatLabelModule,
    SelectModule,
    TaskForm
  ],
  templateUrl: './create-new-task.dialog.html',
  styleUrl: './create-new-task.dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateNewTaskDialog {
  @ViewChild(TaskForm) taskForm!: TaskForm

  private readonly taskStore = inject(TaskStore)
  private readonly messageService = inject(MessageService)

  isDialogVisible = signal<boolean>(false)

  showDialog() {
    this.taskForm.reset()
    this.isDialogVisible.set(true)
  }

  hideDialog() {
    this.isDialogVisible.set(false)
  }

  handleSubmit(task: Partial<ITask>) {
    const name = task.name!
    const description = task.description!
    const priority = task.priority!

    this.taskStore.addTask(name, description, priority)

    this.messageService.add({ severity: 'success', summary: 'Tarea creada', detail: 'La tarea se ha creado correctamente' })

    this.hideDialog()
  }
}
