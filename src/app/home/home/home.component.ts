import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  auth: any;
  constructor(public authService: AuthService) {
    this.authService.user$.subscribe(auth => this.auth = auth);
   }

  ngOnInit() {
  }

}
