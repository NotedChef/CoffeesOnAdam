import { User } from './user';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';


@Injectable()
export class UserService {
  private users$: FirebaseListObservable<User[]> = null;

  constructor(private db: AngularFireDatabase) {
    this.users$ = this.db.list('/users');
   }

  getUsersList(query = {}): FirebaseListObservable<User[]> {
    this.users$ = this.db.list('/users', {
      query: query
    });
    return this.users$;
  }

  updateUser(key: string, value: any): void {
    this.db.list('/users').update(key, value)
      .then(_ => console.log('Updated user info', value))
      .catch(error => this.handleError(error));
  }

  createUser(user: User): void {
    console.log('createUser: ', user);
    this.db.object(`/users/${user.$key}`).set({
      name: user.name,
      isAdmin: user.isAdmin,
      email: user.email
    })
    .then(_ => console.log('Created new user: ', user))
    .catch(error => this.handleError(error));
  }

  getUser(uid: string): FirebaseObjectObservable<User> {
    return this.db.object(`/users/${uid}`);
  }

  userExists(uid: string): boolean {
    let retval: boolean;
    console.log(`/users/${uid}`);
    this.db.object(`/users/${uid}`).first()
      .subscribe (x => {
        console.log('userExists|user', x);
        x.$exists() ?  retval = true : retval = false;
      }
    );
    console.log('UserService.userExists: ', retval);
    return retval;
  }

  isAdmin(uid: string): boolean {
    let retval: boolean;
    this.getUser(uid)
      .subscribe(user => {
          retval = user.isAdmin;
      });
    return retval;
  }

  private handleError(error) {
    console.log(error);
    return Observable.throw(error);
  }

}
