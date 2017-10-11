import { FormControl } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: FirebaseListObservable<User[]>;
  users: User[];
  admins$: FirebaseListObservable<User[]>;
  admins: User[];
  usersControl: FormControl = new FormControl();
  filteredUsers: Observable<User[]>;


  constructor(private userService: UserService) { }

  ngOnInit() {
    // non-admins
    this.users$ = this.userService.getUsersList({
      orderByChild: 'isAdmin',
      equalTo: false
    });
    // admins
    this.admins$ = this.userService.getUsersList({
      orderByChild: 'isAdmin',
      equalTo: true
    });
    this.admins$.subscribe(admins => this.admins = admins);
    this.users$.subscribe(users => this.users = users);

    this.filteredUsers = this.usersControl.valueChanges
    .startWith(null)
    .map(user => user && typeof user === 'object' ? user.name : user)
    .map(name => name ? this.filter(name) : this.users.slice());
    }

  filter(name: string): User[] {
    return this.users
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

}
