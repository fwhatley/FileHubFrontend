import {Mock} from '../mock.base';


export class MockSingleOrgGetFilesModel extends Mock {
  constructor() {
    super();

    this.url = '/api/files';
    this.status = 200;
    this.responseData = `[]`;
  }
}
