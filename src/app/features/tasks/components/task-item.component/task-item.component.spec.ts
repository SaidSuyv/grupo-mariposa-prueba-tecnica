import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemComponent } from './task-item.component';

import { MessageService, ConfirmationService } from 'primeng/api'
import { ITask } from '../../models/task.interface';
import { STORAGE_KEY } from '../../../../core/tokens/storage.token';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  const mockTask: ITask = {
    id: '1',
    name: 'Task 1',
    description: 'Description 1',
    priority: 'high',
    state: 'backlog',
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent],
      providers: [
        ConfirmationService,
        MessageService,
        { provide: STORAGE_KEY, useValue: 'prueba_tecnica_task_test' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);

    fixture.componentRef.setInput('task', mockTask)

    component = fixture.componentInstance;

    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
