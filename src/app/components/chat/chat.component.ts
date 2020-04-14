import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../service/chat/chat.service';
import { ProductsService } from '../../service/product/products.service';
import { Observable } from 'rxjs';
import { ProductsInterface } from '../../models/products.interface';
import { Message } from '../../models/message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {
  public products$: Observable<ProductsInterface[]>
  public message$: Observable<Message[]>
  message = '';
  element: any;


  constructor(public chatService:ChatService,
              private productsService: ProductsService) {

    this.chatService.loadMessages()
      .subscribe(() => {
        setTimeout(() => {
          this.element.scrollTop = this.element.scrollHeight;
        }, 20);
      });
  }

  ngOnInit(): void {
    this.products$ = this.productsService.getAllProducts()
    this.message$ = this.chatService.getAllMessages()
    this.element = document.getElementById('app-mensajes');
  }

  sendMessage() {
    if (this.message.length === 0) {
      return;
    }
    this.chatService.addMessage(this.message)
      .then(() => this.message = '')
      .catch((err) => console.error('There is an Error', err));
  }

}
