import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewTaskDialog } from './create-new-task.dialog';

describe('CreateNewTaskDialog', () => {
  let component: CreateNewTaskDialog;
  let fixture: ComponentFixture<CreateNewTaskDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewTaskDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateNewTaskDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
