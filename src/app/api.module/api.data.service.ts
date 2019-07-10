import {Injectable} from '@angular/core';
import {ApiDataModel} from '../models/api.data.model';

/**
 * @class ApiDataService
 * @classdesc handles getting the details for a given API
 */
@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  private readonly apiData: any = {

    /* mS APIs */
    getFileRecords: new ApiDataModel({
      apiType: 'mS',
      apiName: 'FileHubService',
      method: 'GET',
      path: `/api/fileRecords`
    }),
    getFileRecordById: new ApiDataModel({
      apiType: 'mS',
      apiName: 'FileHubService',
      method: 'GET',
      path: `/api/fileRecords/{id}`
    }),
    getFile: new ApiDataModel({
      apiType: 'mS',
      apiName: 'FileHubService',
      method: 'GET', // PUT, POST, DELETE
      path: `/api/files`
    })
  };

  public getApiData(apiKey: string): ApiDataModel | boolean {
    const dataModel: ApiDataModel = this.apiData[apiKey];
    if (dataModel) {
      dataModel.apiKey = apiKey;
    }
    return dataModel || false;
  }

  public get getAllApiData(): any {
    return this.apiData;
  }
}
