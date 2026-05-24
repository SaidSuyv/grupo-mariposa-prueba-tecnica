import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPopoverComponent } from './filter-popover.component';

describe('FilterPopoverComponent', () => {
  let component: FilterPopoverComponent;
  let fixture: ComponentFixture<FilterPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterPopoverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterPopoverComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
