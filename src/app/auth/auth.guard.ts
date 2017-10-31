import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.internalUser$
      .take(1)
      .map(user => !!user)
      .do(loggedIn => {
        if(!loggedIn) {
          console.log("Access denied to route");
          this.router.navigate(['/home']);
        }
      });

      // return this.authService.user$
    //   .map(user => {
    //     if (user && user.uid) {
    //       return true;
    //     } else {
    //       this.router.navigate(['/home']);
    //       return false;
    //     }
    //   });
  }
}
