import { Component } from '@angular/core';
import { MessagesService } from '@app/core';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent {
  constructor(public messagesService: MessagesService) { }
}