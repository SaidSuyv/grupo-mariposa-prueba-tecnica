import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskDialog } from './view-task.dialog';

describe('ViewTaskDialog', () => {
  let component: ViewTaskDialog;
  let fixture: ComponentFixture<ViewTaskDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTaskDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewTaskDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
