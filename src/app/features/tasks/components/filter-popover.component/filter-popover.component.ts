import { ChangeDetectionStrategy, Component, inject, input, signal, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Popover, PopoverModule } from 'primeng/popover';
import { TaskStore } from '../../state/task.store';
import { PriorityType, StateType } from '../../models/task.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModule } from "primeng/select";
import { TooltipModule } from "primeng/tooltip";

@Component({
  selector: 'app-filter-popover-component',
  imports: [
    ButtonModule,
    PopoverModule,
    ReactiveFormsModule,
    SelectModule,
    TooltipModule
  ],
  templateUrl: './filter-popover.component.html',
  styleUrl: './filter-popover.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPopoverComponent {
  state = input.required<StateType>()

  @ViewChild(Popover) selfPopover!: Popover

  private readonly fb = inject(FormBuilder)
  private readonly taskStore = inject(TaskStore)

  readonly isFilterActive = signal<boolean>(false)

  readonly priorities: { label: string, value: PriorityType }[] = [
    { label: 'Baja', value: 'low' },
    { label: 'Media', value: 'medium' },
    { label: 'Alta', value: 'high' }
  ]

  readonly filterForm = this.fb.group({
    priority: [null as PriorityType | null, Validators.required]
  })

  handleFilterByPriority() {
    if (this.filterForm.invalid) return
    const priority = this.filterForm.value.priority as PriorityType
    this.taskStore.filterTasksByPriority(this.state(), priority)
    this.selfPopover.hide()
    this.isFilterActive.set(true)
  }

  handleResetFilter() {
    this.taskStore.resetFilter()
    this.filterForm.reset()
    this.selfPopover.hide()
    this.isFilterActive.set(false)
  }

}
