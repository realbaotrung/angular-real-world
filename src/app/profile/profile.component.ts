import { concatMap, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile, UserService, User } from './../core';

@Component({
  template: `
    <div class="profile-page">
      <div class="user-info">
        <div class="container">
          <div class="row">
            <div class="col-sx-12 col-md-10 offset-md-1">
              <img [src]="profile.image" [alt]="profile.username" />
              <h4>{{ profile.username }}</h4>
              <p>{{ profile.bio }}</p>

              <arw-follow-button
                [hidden]="isUser"
                [profile]="profile"
                (toggle)="onToggleFollowing($event)"
              ></arw-follow-button>
              <a
                [routerLink]="['/settings']"
                [hidden]="!isUser"
                class="btn btn-sm btn-outline-secondary action-btn"
              >
                <i class="ion-gear-a"></i> Edit Profile Settings
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <div class="articles-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <a
                    class=""
                    routerLinkActive="active"
                    [routerLinkActiveOptions]="{ exact: true }"
                    [routerLink]="['/profile', profile.username, 'favorites']"
                  >
                    Favorited Posts
                  </a>
                </li>
              </ul>
            </div>

            <!-- For rendering child components -->
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProfileComponent implements OnInit {
  profile: Profile = {} as Profile;
  currentUser: User = {} as User;
  isUser = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        concatMap((data) => {
          this.profile = data['profile'];
          // Load the current user's data.
          return this.userService.currentUser.pipe(
            tap((userData: User) => {
              this.currentUser = userData;
              this.isUser = this.currentUser.username === this.profile.username;
            })
          );
        })
      )
      .subscribe();
  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }
}
