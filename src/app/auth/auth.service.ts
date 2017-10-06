import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User> = null;
  authState: any = null;

  constructor(
      private router: Router,
      private afAuth: AngularFireAuth,
      private db: AngularFireDatabase
     ) {
        this.user$ = this.afAuth.authState;
        this.afAuth.authState.subscribe((auth) =>
          this.authState = auth
        );
      }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then(_ => this.router.navigate(['order']))
      .catch(error => console.log('authentication error: ', error));
      // .then((credential) => {
      //   this.authState = credential.user;
      //   this.updateUserData();
      //   this.router.navigate(['order']);
      // });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Returns user observable
  get currentUserObservable(): any {
    return this.user$;
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false;
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest';
    } else if (this.currentUserAnonymous) {
      return 'Anonymous';
    } else {
      return this.authState['displayName'];
    }
  }

  // Returns the current user photoURL
  get currentUserImageUrl(): string {
    if (this.authState) {
      return this.authState['photoURL'];
    }
    return '';
  }

   //// Helpers ////

   private updateUserData(): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features

    const path = `users/${this.currentUserId}`; // Endpoint on firebase
    const data = {
      email: this.authState.email,
      name: this.authState.displayName
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));

  }


}
