import { Component, OnInit } from '@angular/core';
import { DevTool } from '../model/DevTools';

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
    this.devTool.prodAppUrl = `https://file-hub-frontend.herokuapp.com/dashboard`;
    this.devTool.devApiUrl = `http://localhost:5000/index.html`;
    this.devTool.prodApiUrl = `notimplemented`;
  }

}
