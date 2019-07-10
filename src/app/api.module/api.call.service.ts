import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, from, Observable, throwError} from 'rxjs';
import {delay, finalize, map, repeat, tap} from 'rxjs/operators';
import * as uuid from 'uuid';
import {ApiDataService} from './api.data.service';
import {ApiDataModel} from '../models/api.data.model';
import {ApiMocksService} from '../api.mocks/api.mocks.service';
import {environment} from '../../environments/environment';

/**
 * handles all API calls to micro services and mocks.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  private findUrlParam: RegExp = /{\s*[\w\.]+\s*}/g;
  private paramNameRegExp: RegExp = /[\w\.]+/;
  private readonly BASE_URL: string = environment.FileHubApiBaseUrl;
  /**
   * @constructor
   */
  constructor(
    private http: HttpClient,
    private apiDataService: ApiDataService,
    private apiMocksService: ApiMocksService,
    private router: Router
  ) {
  }

  public callService(apiKey: string, payload: {} = {}, headers?: HttpHeaders): Observable<any> {
    const requestHeaders = this.getHeaders(headers || new HttpHeaders(), apiKey || '');
    const apiData = this.apiDataService.getApiData(apiKey) as ApiDataModel;

    let url =   `${this.BASE_URL}${apiData.path}`;

    const mockResponse = this.apiMocksService.activeMockFor(apiKey, payload);
    if (mockResponse) {
      console.log(`Mock data served for "${apiKey}" on mock list ${this.apiMocksService.activeMock}`);

      return from(mockResponse).pipe(
        map((res: HttpResponse<any>) => {
          return JSON.parse(res.body);
        })
      );
    }

    if (apiData) {
      // if we have url params then make sure they are properly encoded
      (url.match(this.findUrlParam) || []).map((x: string) => {
        const paramName = x.match(this.paramNameRegExp)[0];

        if (payload.hasOwnProperty(paramName)) {
          url = url.replace(`{${paramName}}`, encodeURIComponent(payload[paramName]));
          /* value not required in payload as it is now an encoded url parameter */
          delete payload[paramName];
        }
      });

      return this.http.request(apiData.method, url, {
        headers: requestHeaders,
        observe: 'response',
        body: payload
      }).pipe(
        map((response) => {
          if (response.status === 401) {
            // todo: reroute to not authorized or show a pop up msg
            console.log('api call was 401 - unathorized');
          } else {
            // set headers
          }

          return response.body;
        }),
        finalize(() => {
          // anything you want to do after the call ends
        })
      );
    } else {
      return throwError(new Error(`ApiCallService.callService: api data not found for "${apiKey}"`));
    }
  }

  public getHeaders(appendHeaders?: HttpHeaders, apiKey?: string): HttpHeaders {

    // const customerToken = this.sessionStorageService.getValue('customerToken');
    let headers = appendHeaders ? appendHeaders : new HttpHeaders();

    // if (customerToken) {
    //   headers = headers.append('x-customer-token', customerToken);
    // }
    // if (this.getXSessionId) {
    //   headers = headers.append('x-session-id', this.getXSessionId);
    // }
    // if (this.jwtService.tokenIsSet()) {
      // this.decodedToken = this.jwtService.getDecodedToken();
      headers = headers.append('Content-Type', 'application/json; charset=utf-8');
      // headers = headers.append('x-client-jwt', this.jwtService.getFullToken());
      // headers = (headers['x-terminal-id']) ? headers['x-terminal-id'] : headers.append('x-terminal-id', this.decodedToken.terminalId || '9999');
      // headers = (headers['x-workstation-id']) ? headers['x-workstation-id'] : headers.append('x-workstation-id', this.decodedToken.workstationId || '9999');
      // headers = (headers['x-location-id']) ? headers['x-location-id'] : headers.append('x-location-id', this.decodedToken.locationId || '9999');
      // headers = (headers['x-sales-channel']) ? headers['x-sales-channel'] : headers.append('x-sales-channel', this.decodedToken.salesChannel || 'DRS');
      // headers = (headers['x-company-id']) ? headers['x-company-id'] : headers.append('x-company-id', this.decodedToken.companyId || '9999');
      // headers = (headers['x-internal-location-id']) ? headers['x-internal-location-id'] : headers.append('x-internal-location-id', this.decodedToken.internalLocationId || '9999');
      // headers = headers.append('x-att-conversationId', `m24051~CWPOS~${uuid.v4()}`);
    // }

    return headers;
  }
}
