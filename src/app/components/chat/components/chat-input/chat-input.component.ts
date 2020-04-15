import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../../service/chat/chat.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
  public newMessageText: string = '';

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }
  public submit(message: string): void {
    this.chatService.createMessage(message);

    // reset input
    this.newMessageText = '';
  }

}
