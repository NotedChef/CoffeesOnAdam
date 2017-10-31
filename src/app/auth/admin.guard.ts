import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService,
    private userService: UserService,
    private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // let isAdmin: boolean;
    return this.authService.internalUser$
      .take(1)
      .map(user => !!user && user.isAdmin === true)
      .do(isAdmin => {
        if(!isAdmin) {
          // console.log('Access denied because not an Admin');
          this.router.navigate(['/home']);
        }
      })
    };
    // isAdmin = this.userService.isAdmin(this.authService.currentUserId);
    // console.log(isAdmin);
    // return this.authService.user$
    //   .map(user => {
    //     if (user && user.uid && isAdmin) {
    //       return true;
    //     } else {
    //       this.router.navigate(['/home']);
    //       return false;
    //     }
    //   });
  }
