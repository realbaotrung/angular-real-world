import { catchError } from 'rxjs/operators';
import { Profile, ProfilesService } from '@/core';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<Profile> {
  constructor(
    private profilesService: ProfilesService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<any> {
    return this.profilesService
      .get(route.paramMap.get('username') as string)
      .pipe(catchError((_err) => this.router.navigateByUrl('/')));
  }
}

/*
eslint
  @typescript-eslint/no-explicit-any:0,
  @typescript-eslint/no-unused-vars:0
*/
