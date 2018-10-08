import { TestBed, inject } from '@angular/core/testing';

import { FileRecordService } from './file-record.service';

describe('FileRecordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileRecordService]
    });
  });

  it('should be created', inject([FileRecordService], (service: FileRecordService) => {
    expect(service).toBeTruthy();
  }));
});
