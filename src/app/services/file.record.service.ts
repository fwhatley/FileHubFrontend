import { Injectable } from '@angular/core';
import { FileRecord } from '../models/FileRecord';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {ApiCallService} from '../api.module/api.call.service';
import {ApiErrorModel} from '../models/api.error.model';

@Injectable({
  providedIn: 'root'
})
export class FileRecordService {

  private readonly FileHubApiBaseUrl: string = environment.FileHubApiBaseUrl;
  public baseFileRecordsUrl = `${this.FileHubApiBaseUrl}/api/fileRecords`;

  constructor(private messageService: MessageService,
              private http: HttpClient,
              private apiCallService: ApiCallService) { }

  // ====================== private methods ========================
  private log(message: string) {
    this.messageService.add(`FileRecordService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue. https://angular.io/tutorial/toh-pt6
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // =============== public methods =================================
  public getFileRecord(id: string): Observable<FileRecord> {
    return new Observable((obs) => {
      this.apiCallService.callService('getFileRecordById', {id}).subscribe((res) => {
        if (res && res.hasOwnProperty('code') && res.hasOwnProperty('message')) {
          obs.error(new ApiErrorModel(res));
        } else {
          obs.next( new FileRecord(res));
        }
      }, (error) => {
        obs.error(new ApiErrorModel(error.error));
      });
    });
  }

  public getFileRecords(): Observable<FileRecord[]> {
    return new Observable((obs) => {
      this.apiCallService.callService('getFileRecords').subscribe((res) => {
        if (res && res.hasOwnProperty('code') && res.hasOwnProperty('message')) {
          obs.error(new ApiErrorModel(res));
        } else {
          obs.next((res || []).map((obj) => new FileRecord(obj)));
        }
      }, (error: any) => {
        obs.error(new ApiErrorModel(error.error));
      });
    });
  }

  public createFileRecord(fileRecord: FileRecord): Observable<FileRecord> {
    return this.http.post<FileRecord>(this.baseFileRecordsUrl, fileRecord)
      .pipe(
        tap(fr => this.log(`fectched: ${fr.id}`)),
        catchError(this.handleError<FileRecord>(`getFileRecord object=${JSON.stringify(fileRecord)}`))
    );
  }


}
