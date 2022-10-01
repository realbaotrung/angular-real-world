import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Profile } from '@/core/models';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  private url = '/profiles/';

  constructor(private apiService: ApiService) {}

  get(username: string): Observable<Profile> {
    return this.apiService
      .get(this.url + username)
      .pipe(map((data) => data.profile as Profile));
  }

  follow(username: string): Observable<Profile> {
    return this.apiService.post(this.url + username + '/follow');
  }

  unfollow(username: string): Observable<Profile> {
    return this.apiService.delete(this.url + username + '/follow');
  }
}
