import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Message} from '../../models/message.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map} from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { ProductsInterface } from '../../models/products.interface';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public user: any = {};
  private itemsCollection: AngularFirestoreCollection<Message>;
  public chats: Message[] = [];

  constructor(private afs: AngularFirestore,
              public auth: AngularFireAuth) {

    this.auth.authState.subscribe( user => {
      // console.log('Null state: ', user);
      if (!user) {
        return;
      }
      this.user.name = user.displayName;
      this.user.uid = user.uid;
    });
  }

  loadMessages() {
    this.itemsCollection = this.afs.collection<Message>('chats',
        ref => ref.orderBy('date', 'desc')
      .limit(5));
    return this.itemsCollection.valueChanges()
      .pipe( map((messages: Message[]) => {
        // console.log(messages);
        this.chats = [];
        for (let message of messages) {
          this.chats.unshift(message);
        }
        return this.chats;
      }));
  }

  addMessage(text:string) {
    let message: Message = {
      name: this.user.name,
      message: text,
      date: new Date().getTime(),
      uid: this.user.uid
    };
    return this.itemsCollection.add(message);
  }

  public getAllMessages(): Observable <Message[]>{
    return this.itemsCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Message;
            const id = a.payload.doc.id;
            return { id, ...data}
          }))
      )
  }



}
