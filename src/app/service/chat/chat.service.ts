import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Message} from '../../models/message.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public user: any = {};
  public chats: Observable<any>;
  public changeChatroom: BehaviorSubject<string | null> = new BehaviorSubject(null);
  public selectedChatroom: Observable<any>;
  public selectedChatroomMessages: Observable<any>;


  constructor(private afs: AngularFirestore,
              public auth: AngularFireAuth) {

    this.selectedChatroom = this.changeChatroom.pipe(switchMap(chatroomId => {
      if (chatroomId) {
        return afs.doc(`chats/${chatroomId}`).valueChanges();
      }
      return of(null);
    }));
    this.selectedChatroomMessages = this.changeChatroom.pipe(switchMap(chatroomId => {
      if (chatroomId) {
        return afs.collection(`chats/${chatroomId}/messages`, ref => {
          return ref.orderBy('createdAt', 'desc').limit(100);
        })
          .valueChanges()
          .pipe(map(arr => arr.reverse())

          )

      }
      return of(null);
    }))

    this.chats = afs.collection('chats').valueChanges();

  }
  public createMessage(text: string): void {
    const chatroomId = this.changeChatroom;
    let message: Message = {
      sender: this.user.name,
      message: text,
      date: new Date().getTime(),
      uid: this.user.uid
    };

    this.afs.collection(`chats/${chatroomId}/messages`).add(message);
  }


}
