import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { ImageFile } from './model/imageFile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  APIEndpoint: string = environment.APIEndpoint;
  fileUrl = `${this.APIEndpoint}/api/file`;

  filesToUpload: Array<File>;
  images: Array<ImageFile>;
  currentImageInModal: ImageFile;
  showModal: boolean;

  constructor() {
    this.filesToUpload = [];
    this.images = this.getImageList();
    this.showModal = false;
  }

  // =============== public mehtods =================================
  public upload(): void {
    this.makeFileRequest(this.fileUrl, [], this.filesToUpload).then((result) => {
      console.log(result);
    }, (error) => {
      console.error(error);
    });
  }

  public fileChangeEvent(fileInput: any): void {
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }

  public toggleModal(image: ImageFile): void {
    this.currentImageInModal = image; // closing modal doesn't pass an image therefore img will be set to undefined
    this.showModal = !this.showModal;
  }

  // ====================== private methods ========================
  private makeFileRequest(fileUrl: string, params: Array<string>, files: Array<File> ) {
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

  private randomDate(start, end): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  private getImageList(): Array<ImageFile> {
    const imageUrl = "https://via.placeholder.com/350x150";
    const numberOfImages = 20;
    const images: Array<ImageFile> = [];

    for ( let i = 0; i < numberOfImages; i++ ) {
      const image = new ImageFile();
      image.url = imageUrl;
      image.name = `This is a name - image: ${i}`;
      image.createdUtc = this.randomDate(new Date(2012, 0, 1), new Date());
      images.push(image);
    }

    return images;
  }



}
