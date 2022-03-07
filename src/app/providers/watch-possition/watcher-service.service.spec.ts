import { TestBed } from '@angular/core/testing';

import { WatcherServiceService } from './watcher-service.service';

describe('WatcherServiceService', () => {
  let service: WatcherServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatcherServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
