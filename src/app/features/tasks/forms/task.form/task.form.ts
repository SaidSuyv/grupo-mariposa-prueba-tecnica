import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITask, PriorityType } from '../../models/task.interface';
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
})
export class TaskForm implements OnInit {
  taskData = input<ITask>()
  isEdit = input<boolean>(false)
  onSubmitted = output<Partial<ITask>>()
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
    }
  ]

  taskForm = this.fb.group({
    id: this.fb.control<string|null>(null),
    name: this.fb.control<string | null>(null, Validators.required),
    description: this.fb.control<string | null>(null),
    priority: this.fb.control<PriorityType>('low', Validators.required)
  })

  ngOnInit(): void {
    this.setInputData()
  }

  setInputData(){
    this.taskForm.patchValue({
      id: this.taskData()?.id || null,
      name: this.taskData()?.name || null,
      description: this.taskData()?.description || null,
      priority: this.taskData()?.priority || 'low'
    })
  }

  reset(){
    this.taskForm.reset()
    this.setInputData()
  }

  handleSubmit(){
    if(this.taskForm.invalid) return

    const formValue = this.taskForm.value

    const task = {
      id: formValue.id!,
      name: formValue.name!,
      description: formValue.description!,
      priority: formValue.priority!
    }

    this.onSubmitted.emit(task)
  }

  handleCancelled(){
    this.onCanceled.emit()
  }
}
