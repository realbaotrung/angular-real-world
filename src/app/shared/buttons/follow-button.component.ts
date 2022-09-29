import { Router } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Profile, ProfilesService, UserService } from '../../core';
import { concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'arw-follow-button',
  template: `
    <button
      class="btn btn-sm action-btn"
      [ngClass]="{
        disabled: isSubmitting,
        'btn-outline-secondary': !profile.following,
        'btn-secondary': profile.following
      }"
    >
      <i class="ion-plus-round"></i>
      &nbsp; {{ profile.following ? 'Unfollow' : 'Follow' }}
      {{ profile.username }}
    </button>
  `,
  styles: []
})
export class FollowButtonComponent {
  @Input() profile!: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  constructor(
    private profilesService: ProfilesService,
    private router: Router,
    private userService: UserService
  ) {}

  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated
      .pipe(
        concatMap((authenticated) => {
          // Not authenticated => push to login screen
          if (!authenticated) {
            this.router.navigateByUrl('/login');
            return of(null);
          }

          // Follow this profile if we aren't already
          if (!this.profile.following) {
            return this.profilesService.follow(this.profile.username).pipe(
              tap(
                (_data) => {
                  this.isSubmitting = false;
                  this.toggle.emit(true);
                },
                (_error) => (this.isSubmitting = false)
              )
            );
          } else {
            return this.profilesService.unfollow(this.profile.username).pipe(
              tap(
                (_data) => {
                  this.isSubmitting = false;
                  this.toggle.emit(false);
                },
                (_error) => {
                  this.isSubmitting = false;
                }
              )
            );
          }
        })
      )
      .subscribe();
  }
}

/* eslint @typescript-eslint/no-unused-vars:0 */
