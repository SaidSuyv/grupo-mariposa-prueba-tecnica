import { ChangeDetectionStrategy, Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITask, TaskPriorityType } from '../../models/task.interface';
import { FloatLabel } from "primeng/floatlabel";
import { InputText } from "primeng/inputtext";
import { Textarea } from "primeng/textarea";
import { Select } from "primeng/select";
import { Button } from "primeng/button";

@Component({
  selector: 'app-task-form',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    InputText,
    Textarea,
    Select,
    Button
  ],
  templateUrl: './task.form.html',
  styleUrl: './task.form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskForm implements OnInit {
  taskData = input<ITask>()
  isEdit = input<boolean>(false)
  onSubmitted = output<Pick<ITask, 'name' | 'description' | 'priority' | 'id'>>()
  onCanceled = output<void>()

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
    },
    {
      label: 'Sin prioridad',
      value: 'none'
    }
  ]

  taskForm = this.fb.group({
    id: this.fb.control<string | null>(null),
    name: this.fb.control<string | null>(null, [Validators.required, Validators.pattern(/^\S(?:.*\S)?$/)]),
    description: this.fb.control<string | null>(null, Validators.pattern(/^\S(?:.*\S)?$/)),
    priority: this.fb.control<TaskPriorityType>('low', Validators.required)
  })

  ngOnInit(): void {
    this.setInputData()
  }

  setInputData() {
    this.taskForm.patchValue({
      id: this.taskData()?.id || null,
      name: this.taskData()?.name || null,
      description: this.taskData()?.description || null,
      priority: this.taskData()?.priority || 'none'
    })
  }

  reset() {
    this.taskForm.reset()
    this.setInputData()
  }

  handleSubmit() {
    if (this.taskForm.invalid) return

    const formValue = this.taskForm.value

    const task: Pick<ITask, 'name' | 'description' | 'priority' | 'id'> = {
      id: formValue.id!,
      name: formValue.name!,
      description: formValue.description ?? null,
      priority: formValue.priority!
    }

    this.onSubmitted.emit(task)
  }

  handleCancelled() {
    this.onCanceled.emit()
  }
}
