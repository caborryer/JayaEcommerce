import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Message} from '../../models/message.interface';
import { map} from 'rxjs/operators';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>;
  public chats: Message[] = [];

  constructor(private afs: AngularFirestore,
              public auth: AuthService) { }

  loadMessages() {
    this.itemsCollection = this.afs.collection<Message>('chats',
        ref => ref.orderBy('date', 'desc')
      .limit(5));
    return this.itemsCollection.valueChanges()
      .pipe( map((messages: Message[]) => {
        console.log(messages);
        this.chats = [];
        for (let message of messages) {
          this.chats.unshift(message);
        }
        return this.chats;
        // this.chats = messages;
      }));
  }

  addMessage(text:string) {
    let message: Message = {
      name: 'Cami',
      message: text,
      date: new Date().getTime(),
      // uid: this.user.uid
    };
    return this.itemsCollection.add(message);

  }
}
