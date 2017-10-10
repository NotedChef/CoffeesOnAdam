import { FirebaseListObservable } from 'angularfire2/database';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: FirebaseListObservable<User[]>;
  showOnlyAdmins: boolean;
  filteredUsers: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users$ = this.userService.getUsersList();
  }

}
