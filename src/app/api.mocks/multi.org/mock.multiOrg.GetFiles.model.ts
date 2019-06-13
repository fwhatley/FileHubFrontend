import {Mock} from '../mock.base';


export class MockMultiOrgGetFilesModel extends Mock {
  constructor() {
    super();

    this.url = '/api/files';
    this.status = 200;
    this.responseData = `[
        {
          "id": "50e6215d-b5c6-4896-987c-f30f3678f608",
          "fileRecordId": "10e6215d-b5c6-4896-987c-f30f3678f608",
          "name": "File name 1.jpg",
          "createdUtc": "2016-06-22T00:00:00+00:00",
          "updatedUtc": "2016-06-22T00:00:00+00:00",
          "deletedUtc": "9999-12-31T00:00:00+00:00"
        },
        {
          "id": "60cd8c99-4036-403d-bf84-cf8400f67836",
          "fileRecordId": "20cd8c99-4036-403d-bf84-cf8400f67836",
          "name": "File name 2.jpg",
          "createdUtc": "2016-06-22T00:00:00+00:00",
          "updatedUtc": "2016-06-22T00:00:00+00:00",
          "deletedUtc": "9999-12-31T00:00:00+00:00"
        },
        {
          "id": "70333df6-90a4-4fda-8dd3-9485d27cee36",
          "fileRecordId": "30333df6-90a4-4fda-8dd3-9485d27cee36",
          "name": "File name 3.jpg",
          "createdUtc": "2016-06-22T00:00:00+00:00",
          "updatedUtc": "2016-06-22T00:00:00+00:00",
          "deletedUtc": "9999-12-31T00:00:00+00:00"
        },
        {
          "id": "97bec2a1-7ea5-49c4-9766-bd8d06f9e0e3",
          "fileRecordId": "00000000-0000-0000-0000-000000000000",
          "name": "index.html",
          "createdUtc": "2019-06-09T23:25:05.778243+00:00",
          "updatedUtc": "2019-06-09T23:25:05.778247+00:00",
          "deletedUtc": "9999-12-31T23:59:59.999999+00:00"
        },
        {
          "id": "ad58550c-0107-41ae-95a0-83659ee680ad",
          "fileRecordId": "00000000-0000-0000-0000-000000000000",
          "name": "testResults.html",
          "createdUtc": "2019-06-10T01:29:40.471688+00:00",
          "updatedUtc": "2019-06-10T01:29:40.471692+00:00",
          "deletedUtc": "9999-12-31T23:59:59.999999+00:00"
        },
        {
          "id": "4c9ad708-b0f5-4c13-b33e-dfb1541e54db",
          "fileRecordId": "00000000-0000-0000-0000-000000000000",
          "name": "testResults.html",
          "createdUtc": "2019-06-10T01:43:23.552364+00:00",
          "updatedUtc": "2019-06-10T01:43:23.552367+00:00",
          "deletedUtc": "9999-12-31T23:59:59.999999+00:00"
        },
        {
          "id": "6b6df5af-04d7-4674-9b73-a0b8c221f33c",
          "fileRecordId": "00000000-0000-0000-0000-000000000000",
          "name": "testResults.html",
          "createdUtc": "2019-06-10T01:43:52.031148+00:00",
          "updatedUtc": "2019-06-10T01:43:52.03115+00:00",
          "deletedUtc": "9999-12-31T23:59:59.999999+00:00"
        },
        {
          "id": "92b566a6-3d85-449f-8b99-6394be4998fe",
          "fileRecordId": "00000000-0000-0000-0000-000000000000",
          "name": "testResults.html",
          "createdUtc": "2019-06-10T01:50:38.5514+00:00",
          "updatedUtc": "2019-06-10T01:50:38.551402+00:00",
          "deletedUtc": "9999-12-31T23:59:59.999999+00:00"
        },
        {
          "id": "e46ea2fd-0955-4882-88c7-8bc39ba1324b",
          "fileRecordId": "00000000-0000-0000-0000-000000000000",
          "name": "testResults.html",
          "createdUtc": "2019-06-10T01:57:20.294126+00:00",
          "updatedUtc": "2019-06-10T01:57:20.294129+00:00",
          "deletedUtc": "9999-12-31T23:59:59.999999+00:00"
        },
        {
          "id": "2a0b1610-9420-4797-b6f6-ef0f787e5d5b",
          "fileRecordId": "00000000-0000-0000-0000-000000000000",
          "name": "testResults.html",
          "createdUtc": "2019-06-11T13:39:36.429068+00:00",
          "updatedUtc": "2019-06-11T13:39:36.429073+00:00",
          "deletedUtc": "9999-12-31T23:59:59.999999+00:00"
        },
        {
          "id": "ce9869ed-a877-4ed6-ace6-a349e8da48c9",
          "fileRecordId": "00000000-0000-0000-0000-000000000000",
          "name": "testResults.html",
          "createdUtc": "2019-06-11T13:58:23.207526+00:00",
          "updatedUtc": "2019-06-11T13:58:23.20753+00:00",
          "deletedUtc": "9999-12-31T23:59:59.999999+00:00"
        },
        {
          "id": "64cf3b1b-b717-4fd1-95e1-2d6af272d2e2",
          "fileRecordId": "00000000-0000-0000-0000-000000000000",
          "name": "testResults.html",
          "createdUtc": "2019-06-11T21:22:33.985577+00:00",
          "updatedUtc": "2019-06-11T21:22:33.98558+00:00",
          "deletedUtc": "9999-12-31T23:59:59.999999+00:00"
        },
        {
          "id": "f38b461a-4bbc-42d0-9a7b-03e05db87e34",
          "fileRecordId": "00000000-0000-0000-0000-000000000000",
          "name": "testResults.html",
          "createdUtc": "2019-06-11T21:23:35.880516+00:00",
          "updatedUtc": "2019-06-11T21:23:35.880519+00:00",
          "deletedUtc": "9999-12-31T23:59:59.999999+00:00"
        }
      ]`;
  }
}
