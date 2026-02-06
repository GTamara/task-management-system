import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownFilterComponent } from './dropdown-filter.component';

describe('DropdownFilterComponent', () => {
  let component: DropdownFilterComponent<string>;
  let fixture: ComponentFixture<DropdownFilterComponent<string>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
