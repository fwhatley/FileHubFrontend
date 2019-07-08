export class ApiErrorModel {
  public code: string;
  public message: string;
  public method: string;
  public attributes: any[];
  public vendor: string;
  public status: number;
  public referringPage: string;

  public constructor(values: any = {}) {
    this.code = values && values.code ? '' + values.code : '';
    this.message = values && values.message ? values.message : '';
    this.method = values && values.method ? values.method : '';
    this.attributes = values && values.attributes ? values.attributes : [];
    this.vendor = values && values.vendor ? values.vendor : '';
    this.status = values && values.status ? values.status : 0;
    this.referringPage = values && values.referringPage ? values.referringPage : '';
  }
}
