import { UserService } from './../user.service';
import { User } from './../user';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  @Output() delAdminEvent = new EventEmitter<string>();

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  // updateIsAdmin() {
  //   this.user.isAdmin = !this.user.isAdmin;
  //   console.log('change event triggered', this.user.isAdmin);
  //   this.userService.updateUser(this.user.$key, this.user);
  // }

  removeAdmin(): void {
    this.user.isAdmin = false;
    this.userService.updateUser(this.user.$key, this.user);
    this.delAdminEvent.emit(this.user.$key);  // notify parent component so that it can update itself
  }

}
