import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';

/**
 * all mocks should extend this class
 */
export class Mock {

  public url: string;
  public status: number;
  public responseData: {} | string;

  private mockedResponse(payload: any): Observable<HttpResponse<any>> {
    return of(new HttpResponse({
      url: this.url,
      headers: this.httpHeaders,
      status: this.status,
      body: typeof this.responseData === 'string' ? this.responseData : JSON.stringify(this.responseData)
    }));
  }

  private get httpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'content-type': 'application/json'
    });
  }
}
