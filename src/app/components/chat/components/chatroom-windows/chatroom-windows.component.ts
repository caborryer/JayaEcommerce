import { AfterViewChecked, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Observable} from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { ChatService } from '../../../../service/chat/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chatroom-windows',
  templateUrl: './chatroom-windows.component.html',
  styleUrls: ['./chatroom-windows.component.css']
})
export class ChatroomWindowsComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer: ElementRef;

  private subscriptions: Subscription[] = [];
  public chatroom: Observable<any>;
  public messages: Observable<any>;

  constructor(private route: ActivatedRoute, private chatService: ChatService) {
    this.subscriptions.push(
      this.chatService.selectedChatroom.subscribe(chatroom => {
        this.chatroom = chatroom;
      })
    );

    this.subscriptions.push(
      this.chatService.selectedChatroomMessages.subscribe(messages => {
        this.messages = messages;
      })
    );
  }

  ngOnInit(): void {
    this.scrollToBottom();

    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const chatroomId = params.get('chatroomId');
        this.chatService.changeChatroom.next(chatroomId);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch(err) {}
  }

}
