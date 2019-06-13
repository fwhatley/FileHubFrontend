import { Component, OnInit } from '@angular/core';
import { DevTool } from '../../../models/DevTools';

@Component({
  selector: 'app-dev-tools',
  templateUrl: './dev-tools.component.html',
  styleUrls: ['./dev-tools.component.css']
})
export class DevToolsComponent implements OnInit {

  public enableDevTools = false;
  public devTool: DevTool;

  public constructor() { }

  public ngOnInit() {
    this.devTool = new DevTool();
    this.devTool.devAppUrl = `http://localhost:3001/dashboard`;
    this.devTool.prodAppUrl = `http://172.104.217.57:8080/dashboard`;
    this.devTool.devApiUrl = `http://localhost:5000/index.html`;
    this.devTool.prodApiUrl = `http://23.239.14.119/index.html`;
  }

}
