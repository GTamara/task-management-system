import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyDataMessageComponent } from './empty-data-message.component';

describe('EmptyDataMessageComponent', () => {
  let component: EmptyDataMessageComponent;
  let fixture: ComponentFixture<EmptyDataMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyDataMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyDataMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
