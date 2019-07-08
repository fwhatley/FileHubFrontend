import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FileRecordService } from '../../../services/file.record.service';
import { FileRecord } from '../../../models/FileRecord';

@Component({
  selector: 'app-file-details',
  templateUrl: './file.details.component.html',
  styleUrls: ['./file.details.component.css']
})
export class FileDetailsComponent implements OnInit {

  public fileRecord: FileRecord;

  constructor(private route: ActivatedRoute,
              private fileRecordService: FileRecordService,
              private location: Location) { }

  ngOnInit() {
    this.getFileDetails();
  }

  private getFileDetails(): void {
    const id: string = this.route.snapshot.paramMap.get('id'); // route param are always strings, use + if you want to covern to numbers
    this.fileRecordService.getFileRecord(id)
      .subscribe(fr => {
        this.fileRecord = fr;
      });
  }

  public goBack(): void {
    this.location.back();
  }

}
