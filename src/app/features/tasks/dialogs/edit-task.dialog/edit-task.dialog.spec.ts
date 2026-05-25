import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskDialog } from './edit-task.dialog';
import { MessageService } from 'primeng/api'
import { ITask } from '../../models/task.interface';
import { STORAGE_KEY } from '../../../../core/tokens/storage.token';

describe('EditTaskDialog', () => {
  let component: EditTaskDialog;
  let fixture: ComponentFixture<EditTaskDialog>;

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
      imports: [EditTaskDialog],
      providers: [
        MessageService,
        { provide: STORAGE_KEY, useValue: 'prueba_tecnica_task_test' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTaskDialog);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('task', mockTask)
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
