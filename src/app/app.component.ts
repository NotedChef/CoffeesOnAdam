import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private afd: AngularFireDatabase, public authService: AuthService) {

    // this.items = afd.list(`/Orders`, {query: {orderByChild: 'name'}});
    // this.items
    // .subscribe(
    //   next => console.log('next1: ', next),
    //   error => console.log('error: ', error),
    //   () => console.log('Completed')
    // );
    // const observable = this.afd.object(`/Orders/1`);
    // observable.take(1).subscribe(
    //   next => console.log('next2: ', next),
    //   error => console.log('error: ', error),
    //   () => console.log('Completed')
    // );
  }

  isAdmin(): boolean {
    return this.authService.isAdmin;
  }
}
