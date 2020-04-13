import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(public afsAuth: AngularFireAuth) {
  }
  login() {
    return this.afsAuth.signInWithPopup(new auth.GoogleAuthProvider())

  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }


}
