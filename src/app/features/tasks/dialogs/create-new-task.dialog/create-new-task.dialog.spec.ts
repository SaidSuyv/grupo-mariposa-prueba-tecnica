import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewTaskDialog } from './create-new-task.dialog';

import { MessageService } from 'primeng/api'
import { STORAGE_KEY } from '../../../../core/tokens/storage.token';

describe('CreateNewTaskDialog', () => {
  let component: CreateNewTaskDialog;
  let fixture: ComponentFixture<CreateNewTaskDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewTaskDialog],
      providers: [
        MessageService,
        { provide: STORAGE_KEY, useValue: 'prueba_tecnica_task_test' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateNewTaskDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
