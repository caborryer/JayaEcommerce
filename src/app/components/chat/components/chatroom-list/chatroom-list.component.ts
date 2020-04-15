import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../../service/chat/chat.service';

@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.css']
})
export class ChatroomListComponent implements OnInit {

  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
  }

}
