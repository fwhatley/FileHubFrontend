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

  public FileHubApiBaseUrl: string = environment.FileHubApiBaseUrl;
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
    const url = `${this.baseFileRecordsUrl}/${id}`;
    return this.http.get<FileRecord>(url)
      .pipe(
        tap(fileRecord => this.log(`fectched: ${fileRecord.id}`)),
        catchError(this.handleError<FileRecord>(`getFileRecord id=${id}`))
    );
  }

  // public getFileRecords(): Observable<FileRecord[]> {
  //   return this.http.get<FileRecord[]>(this.baseFileRecordsUrl)
  //     .pipe( // tap allows you to see the data, not modify
  //       tap(fileRecords => this.log(`fectched: ${fileRecords.length} file records`)),
  //       catchError(this.handleError('getFileRecords', []))
  //       // ${JSON.stringify(fileRecords)} // to print the request contents
  //   );
  // }
  public getFileRecords(): Observable<FileRecord[]> {

    return new Observable(obs => {
      this.apiCallService.callService('getFileRecords').subscribe((respObj) => {
        if (respObj && respObj.hasOwnProperty('code') && respObj.hasOwnProperty('message')) {
          obs.error(new ApiErrorModel(respObj));
        } else {
          obs.next(respObj);
        }
      }, (error) => {
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
