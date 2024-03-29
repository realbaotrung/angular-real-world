import { Component, OnInit } from '@angular/core';
import { UserService } from '@/core/services';
import { User } from '@/core/models';

@Component({
  selector: 'arw-layout-header',
  template: `
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" routerLink="/">conduit</a>

        <!-- show this for logged out users -->
        <ul *arwShowAuthed="false" class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <a class="nav-link" routerLink="/"> Home </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" routerLink="/login" routerLinkActive="active">
              Sign in
            </a>
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              routerLink="/register"
              routerLinkActive="active"
            >
              Sign up
            </a>
          </li>
        </ul>

        <!-- Show this for logged in users -->
        <ul *arwShowAuthed="true" class="nav navbar-nav pull-xs-right">
          <!-- https://angular.io/api/router/RouterLinkActive#description -->
          <!-- https://stackoverflow.com/a/62430403 -->
          <li class="nav-item">
            <a
              class="nav-link"
              routerLink="/"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
            >
              Home
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" routerLink="/editor" routerLinkActive="active">
              <i class="ion-compose"></i>&nbsp;New Article
            </a>
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              routerLink="/settings"
              routerLinkActive="active"
            >
              <i class="ion-gear-a"></i>&nbsp;Settings
            </a>
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              [routerLink]="['/profile', currentUser.username]"
              routerLinkActive="active"
            >
              <img
                *ngIf="currentUser.image"
                [src]="currentUser.image"
                class="user-pic"
              />
              {{ currentUser.username }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: []
})
export class HeaderComponent implements OnInit {
  // currentUser: User = <User>{};
  currentUser: User = {} as User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.currentUser.subscribe((userData) => {
      this.currentUser = userData;
    });
  }
}
