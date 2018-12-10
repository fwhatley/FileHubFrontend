import { Injectable } from '@angular/core';
import { MOCK_FILE_RECORDS } from './mock-file-records';
import { FileRecord } from '../model/FileRecord';
import { Observable, of } from 'rxjs';
import { MessageService } from '../messages/message.service';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FhFile } from '../model/FhFile';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  public FileHubApiBaseUrl: string = environment.FileHubApiBaseUrl;
  public baseFilesUrl = `${this.FileHubApiBaseUrl}/api/files`;

  constructor(private messageService: MessageService,
              private http: HttpClient) { }

  // ====================== private methods ========================
  private log(message: string) {
    this.messageService.add(`FileService: ${message}`);
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
  public uploadFile(fileFormData: FormData): Promise<FhFile> {
    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {

            // TODO: add a mapper to simplify this crazy mapping
            const json = JSON.parse(xhr.response);
            const fhFile = new FhFile();

            fhFile.id = json.id;
            fhFile.name = json.name;
            fhFile.fileRecordId = json.fileRecordId;
            fhFile.createdUtc = json.createdUtc;
            fhFile.updatedUtc = json.updatedUtc;
            fhFile.deletedUtc = json.deletedUtc;
            resolve(fhFile);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', this.baseFilesUrl, true);
      xhr.send(fileFormData);

    });
  }

}
