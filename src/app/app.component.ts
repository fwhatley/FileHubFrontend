import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FileHub';
  APIEndpoint: string = environment.APIEndpoint;
  fileUrl = `${this.APIEndpoint}/file`;
  filesToUpload: Array<File>;

  constructor() {
    this.filesToUpload = [];
  }

  upload() {
    this.makeFileRequest(this.fileUrl, [], this.filesToUpload).then((result) => {
      console.log(result);
    }, (error) => {
      console.error(error);
    });

  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }

  makeFileRequest(fileUrl: string, params: Array<string>, files: Array<File> ) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();
      for (let i = 0; i < files.length; i++) {
        formData.append('fileToUpload', files[i], files[i].name);
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

      xhr.open('POST', fileUrl, true);
      xhr.send(formData);

    });
  }

}
