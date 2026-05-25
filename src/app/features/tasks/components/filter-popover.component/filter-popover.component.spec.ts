import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPopoverComponent } from './filter-popover.component';
import { STORAGE_KEY } from '../../../../core/tokens/storage.token';

describe('FilterPopoverComponent', () => {
  let component: FilterPopoverComponent;
  let fixture: ComponentFixture<FilterPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterPopoverComponent],
      providers: [
        { provide: STORAGE_KEY, useValue: 'prueba_tecnica_task_test' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterPopoverComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
