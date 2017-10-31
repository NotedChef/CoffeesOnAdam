import { FormControl } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  nonAdmins$: FirebaseListObservable<User[]>;
  nonAdmins: User[];
  admins$: FirebaseListObservable<User[]>;
  admins: User[];

  usersControl: FormControl = new FormControl();
  filteredUsers$: Observable<User[]>;


  constructor(private userService: UserService) {
  }

  ngOnInit() {
    // non-admins
    this.nonAdmins$ = this.userService.getUsersList({
      orderByChild: 'isAdmin',
      equalTo: false
    });
    // admins
    this.admins$ = this.userService.getUsersList({
      orderByChild: 'isAdmin',
      equalTo: true
    });
    this.admins$.subscribe(admins => this.admins = admins);
    this.nonAdmins$.subscribe(nonAdmins => this.nonAdmins = nonAdmins);

    this.filteredUsers$ = this.usersControl.valueChanges
    .startWith(null)
    .map(userSearch => userSearch && typeof userSearch === 'object' ? userSearch.name : userSearch)
    .map(name => name ? this.filterOnName(name) : this.nonAdmins.slice());

    // const allUsers$ = Observable.combineLatest(this.nonAdmins$, this.admins$);
    // allUsers$.subscribe(([nonAdmins, adminUsers]) => console.log('NonAdmins: ', nonAdmins, 'Admins', adminUsers));
  }

  filterOnName(name: string): User[] {
    return this.nonAdmins
    .filter(user => user.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayName(user: User): string | User {
    return user ? user.name : user;
   }

  addAdmin() {
    // set the user's isAdmin field to true
    const newAdmin = this.usersControl.value;
    newAdmin.isAdmin = true;
    this.userService.updateUser(newAdmin.$key, newAdmin);
    this.usersControl.reset();
  }

  adminDeleted(uid:string) {
    // an admin was deleted in the child list, so list of users bound to 
    // console.log("Deleted admin with uid of: ", uid);
    this.filteredUsers$ = this.nonAdmins$;
  }

}
