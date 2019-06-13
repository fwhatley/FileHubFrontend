import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FileRecord } from '../../models/FileRecord';
import {FileRecordService} from '../../serivces/file.record.service';
import {FileService} from '../../serivces/file.service';

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
  constructor(private fileRecordService: FileRecordService, private fileService: FileService) {
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

    const fileFormDataToUpload = this.getFileFormDataToUpload();
    if ( fileFormDataToUpload == null ) {
      console.log('INFO - add a file to upload. We didn\'t detect a file to upload');
      return;
    }

    const fileRecord: FileRecord = new FileRecord();
    fileRecord.name = this.getFirstFileNameToUpload(this.filesToUpload); // add name required field to create FileRecords: filename

    // create a fileRecord to get the id
    // upload file, add fileRecordId to the call
    // once those two area created do a get call to the fileRecord by Id and add the fileRecord to the list
    this.fileRecordService.createFileRecord(fileRecord)
      .subscribe(fr => {

        // add fieds to create a fhFile: fileRecordId
        fileFormDataToUpload.append('fileRecordId', fr.id);
        this.fileService.uploadFile(fileFormDataToUpload).then((res) => {

          // returns a file record, get the new fileRecord id
          this.fileRecordService.getFileRecord(fr.id)
          .subscribe(_fr => {
            this.fileRecords.push(_fr);
          });
        }, (error) => {
          console.error(error);
        });

      });

  }

  public fileChangeEvent(fileInput: any): void {
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }

  public toggleModal(image: FileRecord): void {
    this.currentImageInModal = image; // closing modal doesn't pass an image therefore img will be set to undefined
    this.showModal = !this.showModal;
  }

  // =============== private methods =================================
  // only public methods are accessible from the view .html, by default methods are public
  private getFileFormDataToUpload() {
    let formData: any = new FormData();

    // actually only one file should exist. Iterating just to avoid index out of bounds errors
    for (let i = 0; i < this.filesToUpload.length; i++) {
      formData.append('file', this.filesToUpload[i], this.filesToUpload[i].name); // file is the name of the formData param required
    }

    if (this.filesToUpload.length <= 0 ) {
      formData = null;
    }

    return formData;
  }

  private getFirstFileNameToUpload(filesToUpload: Array<File>): string {

    for (let i = 0; i < filesToUpload.length; i++) {
      return filesToUpload[i].name;
    }

    return null;
  }

}
