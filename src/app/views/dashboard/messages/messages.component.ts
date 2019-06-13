import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../serivces/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // Angular only binds to public component properties.
  debugger;
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
