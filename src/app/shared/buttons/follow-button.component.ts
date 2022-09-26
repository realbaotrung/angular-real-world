import { Router } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Profile, ProfilesService, UserService } from '../../core';

@Component({
  selector: 'arw-follow-button',
  template: ` <p>follow-button works!</p> `,
  styles: []
})
export class FollowButtonComponent {
  @Input() profile: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  constructor(
    private profilesService: ProfilesService,
    private router: Router,
    private userService: UserService
  ) {}
}
