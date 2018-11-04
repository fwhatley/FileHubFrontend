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
    this.fileRecordService.getFileRecords()
      .subscribe(frs => {
        this.fileRecords = frs;
      });
  }

  // =============== public methods =================================
  // only public methods are accessible from the view .html, by default methods are public
  public clickUpload(): void {
    this.fileRecordService.uploadFile(this.filesToUpload).then((response) => {
      this.fileRecords.push(response);
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

}
