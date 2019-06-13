import {Mock} from '../mock.base';


export class MockSingleOrgGetFileRecordsModel extends Mock {
  constructor() {
    super();

    this.url = '/api/fileRecords';
    this.status = 200;
    this.responseData = `[
      {
        "id": "10e6215d-b5c6-4896-987c-f30f3678f608",
        "name": "File record name 1.jpg",
        "description": "this is a Description",
        "url": "http://23.239.14.119/api/files/downloadFile/50e6215d-b5c6-4896-987c-f30f3678f608",
        "tags": "tag1, tag2",
        "createdUtc": "2016-06-22T00:00:00+00:00",
        "updatedUtc": "2016-06-22T00:00:00+00:00",
        "deletedUtc": "9999-12-31T00:00:00+00:00"
      },
      {
        "id": "20cd8c99-4036-403d-bf84-cf8400f67836",
        "name": "File record name 2.jpg",
        "description": "this is a Description",
        "url": "http://23.239.14.119/api/files/downloadFile/60cd8c99-4036-403d-bf84-cf8400f67836",
        "tags": "tag1, tag2",
        "createdUtc": "2016-06-22T00:00:00+00:00",
        "updatedUtc": "2016-06-22T00:00:00+00:00",
        "deletedUtc": "9999-12-31T00:00:00+00:00"
      },
      {
        "id": "30333df6-90a4-4fda-8dd3-9485d27cee36",
        "name": "File record name 3.jpg",
        "description": "this is a Description",
        "url": "http://23.239.14.119/api/files/downloadFile/70333df6-90a4-4fda-8dd3-9485d27cee36",
        "tags": "tag1, tag2",
        "createdUtc": "2016-06-22T00:00:00+00:00",
        "updatedUtc": "2016-06-22T00:00:00+00:00",
        "deletedUtc": "9999-12-31T00:00:00+00:00"
      }
    ]`;
  }
}
