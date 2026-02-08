import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConfigurableSelectComponent } from './form-configurable-select.component';

describe('FormConfigurableSelectComponent', () => {
  let component: FormConfigurableSelectComponent;
  let fixture: ComponentFixture<FormConfigurableSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormConfigurableSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormConfigurableSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
