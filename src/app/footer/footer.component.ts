import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  enableDevTools = true;
  devAppUrl  = `http://localhost:3001/dashboard`;
  prodAppUrl = `https://file-hub-frontend.herokuapp.com/dashboard`;
  devApiUrl  = `http://localhost:5000/index.html`;
  prodApiUrl = `notimplemented`;

  constructor() { }

  ngOnInit() {
  }

}
