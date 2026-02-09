import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurableSelectComponent } from './configurable-select.component';

describe('DropdownFilterComponent', () => {
  let component: ConfigurableSelectComponent<string>;
  let fixture: ComponentFixture<ConfigurableSelectComponent<string>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurableSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurableSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
