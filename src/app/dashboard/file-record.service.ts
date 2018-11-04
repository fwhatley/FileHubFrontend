import { Injectable } from '@angular/core';
import { MOCK_FILE_RECORDS } from './mock-file-records';
import { FileRecord } from '../model/FileRecord';
import { Observable, of } from 'rxjs';
import { MessageService } from '../messages/message.service';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileRecordService {

  public FileHubApiBaseUrl: string = environment.FileHubApiBaseUrl;
  public baseFileRecordsUrl = `${this.FileHubApiBaseUrl}/api/files`;

  constructor(private messageService: MessageService,
              private http: HttpClient) { }

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

  private createFileRecordFromJson(jsonString: string): FileRecord {
    const json = JSON.parse(jsonString);
    const fileRecord = new FileRecord();
    fileRecord.id = json.id;
    fileRecord.name = json.name;
    fileRecord.description = json.description;
    fileRecord.url = json.url;
    fileRecord.tags = json.tags;
    fileRecord.createdUtc = json.createdUtc;
    fileRecord.updatedUtc = json.updatedUtc;
    fileRecord.deletedUtc = json.deletedUtc;

    return fileRecord;
  }

  // =============== public methods =================================
  public getFileRecords(): Observable<FileRecord[]> {
    return this.http.get<FileRecord[]>(this.baseFileRecordsUrl)
      .pipe( // tap allows you to see the data, not modify
        tap(fileRecords => this.log(`fectched: ${fileRecords.length} file records`)),
        catchError(this.handleError('getFileRecords()', []))
        // ${JSON.stringify(fileRecords)} // to print the request contents
    );
  }

  public uploadFile(filesToUpload): Promise<FileRecord> {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      // actually only one file should exist. Iterating just to avoid index out of bounds errors
      for (let i = 0; i < filesToUpload.length; i++) {
        formData.append('file', filesToUpload[i], filesToUpload[i].name);
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {

            // TODO: add a mapper to simplify this crazy mapping
            const json = JSON.parse(xhr.response);
            const fileRecord = new FileRecord();

            fileRecord.id = json.id;
            fileRecord.name = json.name;
            fileRecord.description = json.description;
            fileRecord.url = json.url;
            fileRecord.tags = json.tags;
            fileRecord.createdUtc = json.createdUtc;
            fileRecord.updatedUtc = json.updatedUtc;
            fileRecord.deletedUtc = json.deletedUtc;
            resolve(fileRecord);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', this.baseFileRecordsUrl, true);
      xhr.send(formData);

    });
  }

}
