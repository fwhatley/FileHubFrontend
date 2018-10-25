import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { FileRecord } from '../model/FileRecord';
import { FileRecordService } from './file-record.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // declaring public/private bc Angular only binds to public properties
  public FileHubApiBaseUrl: string = environment.FileHubApiBaseUrl;
  public baseFileRecordsUrl = `${this.FileHubApiBaseUrl}/api/files`; // TODO: move this into a service to

  public filesToUpload: Array<File>;
  public currentImageInModal: FileRecord;
  public showModal: boolean;
  public fileRecords: FileRecord[];

  // inject dependency (DI): https://angular.io/tutorial/toh-pt4
  // will make fileRecordService accessible with this keyword
  // constructors is where dependecies should be injected
  constructor(private fileRecordService: FileRecordService) {
    this.filesToUpload = [];
    this.showModal = false;
  }

  // get all required data from the web
  ngOnInit() {
    this.getFileRecords();
  }

  // =============== public methods =================================
  // only public methods are accessible from the view .html, by default methods are public
  // TODO: move internal dependent methods into a service
  public upload(): void {
    this.makeFileRequest(this.baseFileRecordsUrl, [], this.filesToUpload).then((result) => {
      console.log(result);
    }, (error) => {
      console.error(error);
    });
  }

  public fileChangeEvent(fileInput: any): void {
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }

  public toggleModal(image: FileRecord): void {
    this.currentImageInModal = image; // closing modal doesn't pass an image therefore img will be set to undefined
    this.showModal = !this.showModal;
  }

  // ====================== private methods ========================
  private getFileRecords(): void {
    this.fileRecordService.getFileRecords()
      .subscribe(frs => {
        this.fileRecords = frs;
      });
  }

  private makeFileRequest(baseFileRecordsUrl: string, params: Array<string>, files: Array<File> ) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i], files[i].name);
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', baseFileRecordsUrl, true);
      xhr.send(formData);

    });
  }

}
