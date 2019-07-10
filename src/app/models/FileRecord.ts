import {environment} from '../../environments/environment';

export class FileRecord {
    public id: string;
    public name: string;
    public description: string;
    public url: string;
    public tags: string;
    public createdUtc: Date;
    public updatedUtc: Date;
    public deletedUtc: Date;

    public constructor(values: any = {}) {
      this.id = values.id || '';
      this.name = values.name || '';
      this.description = values.description || '';
      this.url = this.getUrl(values);
      this.tags = values.tags || '';
      this.createdUtc = values.createdUtc || new Date();
      this.updatedUtc = values.updatedUtc || new Date();
      this.deletedUtc = values.deletedUtc || new Date();
    }

    private getUrl(values: any = {}): string {
      const BASE_URL = environment.FileHubApiBaseUrl;
      return values.url ? BASE_URL + values.url : '';
    }

}
