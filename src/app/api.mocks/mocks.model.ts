import {MockMultiOrgGetFilesModel} from './multi.org/mock.multiOrg.GetFiles.model';
import {MockMultiOrgGetFileRecordsModel} from './multi.org/mock.multiOrg.getFileRecords.model';
import {MockSingleOrgGetFileRecordsModel} from './single.org/mock.singleOrg.getFileRecords.model';
import {MockSingleOrgGetFilesModel} from './single.org/mock.singleOrg.getFiles.model';

export class MocksModel {

  public mocks: any = {};

  public constructor() {

    this.mocks = {
      'SINGLE.ORG': {
        getFileRecords: new MockSingleOrgGetFileRecordsModel(),
        getFile: new MockSingleOrgGetFilesModel(),
      },
      'MULTI.ORG': {
        getFileRecords: new MockMultiOrgGetFileRecordsModel(),
        getFile: new MockMultiOrgGetFilesModel(),
      },

    };
  }
}
