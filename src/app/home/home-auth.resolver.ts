import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from '@/core/services';

@Injectable({
  providedIn: 'root'
})
export class HomeAuthResolver implements Resolve<boolean> {
  constructor(private userService: UserService) {}

  resolve(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    const isAuth$ = this.userService.isAuthenticated.pipe(take(1));
    return isAuth$;
  }
}

/* eslint @typescript-eslint/no-unused-vars:0 */
