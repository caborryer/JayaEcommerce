import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: any = {};
  public userData$: Observable<any>

  constructor(public auth: AngularFireAuth) {
    this.userData$ = this.auth.authState

    this.userData$.subscribe( user => {
      // console.log('Null state: ', user);
      if (!user) {
        return;
      }
      this.user.name = user.displayName;
      this.user.uid = user.uid;
      this.user.profileImage = user.photoURL;
    });
  }

  login(provider: string) {
    if (provider === 'google') {
      this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }

  }
  logout() {
    this.user = {};
    this.auth.signOut();
  }
}
