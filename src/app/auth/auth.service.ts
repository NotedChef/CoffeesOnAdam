import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../user/user';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


@Injectable()
export class AuthService {
  user$: Observable<firebase.User> = null;
  authState: firebase.User = null;
  internalUser$: Observable<User>;
  // private authState2;
  // public authStateSource = new BehaviorSubject<any>(null);
  // public authState$ = this.authStateSource.asObservable();

  constructor(
      private router: Router,
      private afAuth: AngularFireAuth,
      private db: AngularFireDatabase,
      private userService: UserService
     ) {
        this.internalUser$ = this.afAuth.authState
          .switchMap(user => {
            if(user) {
              return this.userService.getUser(user.uid);
            } else {
              return Observable.of(null);
            }
          })


        this.user$ = this.afAuth.authState;
        this.afAuth.authState.subscribe((auth) => {
          this.authState = auth;
          console.log('authState: ', this.authState);

          if (auth && auth.uid) {
            this.db.object(`users/${auth.uid}`)
              .first()
              .subscribe(admin => {
                if (admin.isAdmin === true) {
                  auth['admin'] = admin;
                  console.log(`user is an admin so setting auth['admin']`);
                }
              },
              error => this.errorHandler(error)
            );
          }
        });
      }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.authState = credential.user;
        this.checkIfUserExists(this.authState);
        this.router.navigate(['order']);
      })
      .catch(error => console.log('authentication error: ', error));
  }

  logout(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }


  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  get isAdmin(): boolean {
     // console.log('authService.isAdmin: ', this.currentUserId);
    if (this.authenticated) {
      return this.userService.isAdmin(this.currentUserId);
    }
    return false;
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

   private updateUserData(user: firebase.User): void {
    // Writes user name and email to realtime db
      const data = {
        email: this.authState.email,
        name: this.authState.displayName
      };
      this.userService.updateUser(this.authState.uid, data);

    }

  private addNewUserRecord() {
      // create new user entry
      const user = {
        $key: this.authState.uid,
        email: this.authState.email,
        name: this.authState.displayName,
        isAdmin: false
      };
      this.userService.createUser(user);
  }

  private checkIfUserExists(auth: firebase.User) {
    // console.log(`checkifuserexists(${auth.uid})`);
    return this.db.object(`users/${auth.uid}`)
      .first()
      .subscribe(
      data => {
        if (data.$value !== null) {
          console.log('User does exist', data);
          this.updateUserData(data);
        } else {
          console.log('new user, will add record');
          this.addNewUserRecord();
        }
      },
      error => this.errorHandler(error)
      );
  }

  private errorHandler(error: any) {
    console.log(error);
  }


}
