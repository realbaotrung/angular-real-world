import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}
  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.userService.isAuthenticated.pipe(take(1));
  }
}

/* eslint @typescript-eslint/no-unused-vars:0 */
