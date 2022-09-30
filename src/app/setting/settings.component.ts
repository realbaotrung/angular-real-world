import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Errors, User, UserService } from '../core';

@Component({
  selector: 'arw-settings',
  template: `
    <div class="settings-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>

            <arw-list-errors [errors]="errors"></arw-list-errors>

            <form [formGroup]="settingsForm" (ngSubmit)="submitForm()">
              <fieldset [disabled]="isSubmitting">
                <fieldset class="form-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    formControlName="image"
                  />
                </fieldset>

                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    formControlName="username"
                  />
                </fieldset>

                <fieldset class="form-group">
                  <textarea
                    class="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio about you"
                    formControlName="bio"
                  >
                  </textarea>
                </fieldset>

                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    formControlName="email"
                  />
                </fieldset>

                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="New Password"
                    formControlName="password"
                  />
                </fieldset>

                <button
                  class="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                >
                  Update Settings
                </button>
              </fieldset>
            </form>

            <!-- Line break for logout button -->
            <hr />

            <button class="btn btn-outline-danger" (click)="logout()">
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SettingsComponent implements OnInit {
  user: User = {} as User;
  settingsForm: FormGroup;
  errors: Errors = {} as Errors;
  isSubmitting = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // create form group using the form builder
    this.settingsForm = this.fb.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    });
    // Optional: subscribe to changes on the form
    // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));
  }

  ngOnInit(): void {
    // Make a copy of current user's object to place in editable form fields
    Object.assign(this.user, this.userService.getCurrentUser());
    // Fill the form
    this.settingsForm.patchValue(this.user);
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateUser(this.settingsForm.value);

    this.userService.update(this.user).subscribe(
      (updatedUser) =>
        this.router.navigateByUrl('/profile/' + updatedUser.username),
      (err) => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  updateUser(values: Record<string, unknown>) {
    Object.assign(this.user, values);
  }
}
