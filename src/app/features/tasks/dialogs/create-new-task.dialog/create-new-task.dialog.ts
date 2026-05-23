import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { TaskStore } from '../../state/task.store';
import { ITask, PriorityType, StateType } from '../../models/task.interface';

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
  ],
  templateUrl: './create-new-task.dialog.html',
  styleUrl: './create-new-task.dialog.css',
})
export class CreateNewTaskDialog {

  private readonly taskStore = inject(TaskStore)
  private readonly fb = inject(FormBuilder)

  priorityOptions = [
    {
      label: 'Baja',
      value: 'low'
    },
    {
      label: 'Media',
      value: 'medium'
    },
    {
      label: 'Alta',
      value: 'high'
    }
  ]

  newTaskForm = this.fb.group({
    name: this.fb.control<string | null>(null, Validators.required),
    description: this.fb.control<string | null>(null),
    priority: this.fb.control<PriorityType>('low', Validators.required)
  })

  isDialogVisible = signal<boolean>(false)

  showDialog() {
    this.newTaskForm.reset()
    this.isDialogVisible.set(true)
  }

  hideDialog() {
    this.isDialogVisible.set(false)
  }

  handleSubmit() {
    if (this.newTaskForm.invalid) return

    const formValue = this.newTaskForm.value

    const name = formValue.name!
    const description = formValue.description!
    const priority = formValue.priority!

    this.taskStore.addTask(name, description, priority)

    this.hideDialog()
  }
}
