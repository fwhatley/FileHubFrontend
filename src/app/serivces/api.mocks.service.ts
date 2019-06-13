import {Injectable} from '@angular/core';
import {MocksModel} from '../api.mocks/mocks.model';

@Injectable()
export class ApiMocksService {

  public mockModel: MocksModel = new MocksModel();

  public activeMockFor(path: string, payload: any): any {
    if (this.activeMock && this.mockModel &&
      this.mockModel.mocks.hasOwnProperty(this.activeMock) &&
      this.mockModel.mocks[this.activeMock].hasOwnProperty(path)) {

      return this.mockModel.mocks[this.activeMock][path].mockedResponse(payload);
    }
    return false;
  }

  public get activeMock(): string {
    return this.sessionMock || this.localMock || '';
  }

  public get localMock(): string {
    return localStorage.getItem('appMock') || '';
  }

  public get sessionMock(): string {
    return sessionStorage.getItem('appMock') || '';
  }

  public get mockList() {
    return this.mockModel ? Object.keys(this.mockModel.mocks) : [];
  }

  public mockPathList(id: string): any {
    return this.mockModel ? Object.keys(this.mockData(id))
      .map((name: string) => ({
          name,
          data: this.mockModel.mocks[id][name]
        })
      ) : [];
  }

  public mockData(id: string): any {
    return this.mockModel && this.mockModel.mocks.hasOwnProperty(id) ? this.mockModel.mocks[id] : {};
  }

}
