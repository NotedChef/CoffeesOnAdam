import { UserService } from './../user.service';
import { User } from './../user';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  updateIsAdmin() {
    this.user.isAdmin = !this.user.isAdmin;
    console.log('change event triggered', this.user.isAdmin);
    this.userService.updateUser(this.user.$key, this.user);
  }

  removeAdmin(): void {
    this.user.isAdmin = false;
    this.userService.updateUser(this.user.$key, this.user);
  }

}
