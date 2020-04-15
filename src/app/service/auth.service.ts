import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import { UserInterface } from '../models/user.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: Observable<UserInterface | null>;


  constructor(public afsAuth: AngularFireAuth) {
    this.currentUser = this.afsAuth.authState
  }
  login() {
    return this.afsAuth.signInWithPopup(new auth.GoogleAuthProvider())

  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }


}
