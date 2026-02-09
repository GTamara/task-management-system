import { TestBed } from '@angular/core/testing';

import { TasksViewStateService } from './tasks-view-state.service';

describe('SidenavStateService', () => {
  let service: TasksViewStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksViewStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
