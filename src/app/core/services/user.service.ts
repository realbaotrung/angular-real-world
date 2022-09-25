import { Injectable } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * It needs an initial value and stores the latest value emitted to
   * its consumers, and whenever a new Observer subscribes, it will
   * immediately receive the "current value" from the BehaviorSubject.
   */
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  /**
   * A ReplaySubject is similar to a BehaviorSubject in that
   * it can send old values to new subscribers,
   * but it can also record a part of the Observable execution
   */
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService, private jwtService: JwtService) {}

  /**
   * Verify JWT in localStorage with server and load user's info
   * this runs once on application startup.
   */
  populate() {
    if (this.jwtService.getToken()) {
      this.apiService.get('/user').subscribe(
        (data) => this.setAuth(data.user),
        (error) => this.purgeAuth()
      );
    } else {
      this.purgeAuth();
    }
  }

  /**
   * when login success, set user info
   * @param user
   */
  setAuth(user: User) {
    // Save JWT sent from server in localStorage
    this.jwtService.saveToken(user.token);
    // Set current user to an empty object
    this.currentUserSubject.next(user);
    // Set auth status to false
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Reset auth state and current user
   */
  purgeAuth() {
    // Remove JWT from localStorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type: string, credentials: any): Observable<User> {
    const route = type === 'login' ? '/login' : '';
    return this.apiService.post('/user' + route, { user: credentials }).pipe(
      map(
        // like array map
        (data) => {
          this.setAuth(data.user);
          return data;
        }
      )
    );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Update the user on server (email, pass, etc...)
   * @param user
   */
  update(user: User): Observable<User> {
    return this.apiService.put('/user', { user }).pipe(
      map((data) => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      })
    );
  }
}

/*
eslint
  @typescript-eslint/no-unused-vars:0,
  @typescript-eslint/no-explicit-any:0
*/
