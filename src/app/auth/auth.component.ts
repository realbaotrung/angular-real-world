import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Errors, UserService } from '../core';

@Component({
  selector: 'arw-auth',
  template: `
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">{{ title }}</h1>
            <p class="text-xs-center">
              <a *ngIf="authType === 'register'" [routerLink]="['/login']"
                >Have an account?</a
              >
              <a *ngIf="authType === 'login'" [routerLink]="['/register']"
                >Need an account?</a
              >
            </p>

            <arw-list-errors [errors]="errors"></arw-list-errors>

            <form [formGroup]="authForm" (ngSubmit)="submitForm()">
              <fieldset [disabled]="isSubmitting">
                <fieldset class="form-group">
                  <input
                    *ngIf="authType === 'register'"
                    formControlName="username"
                    placeholder="Username"
                    class="form-control form-control-lg"
                    type="text"
                  />
                </fieldset>

                <fieldset class="form-group">
                  <input
                    formControlName="email"
                    placeholder="Email"
                    class="form-control form-control-lg"
                    type="text"
                  />
                </fieldset>

                <fieldset class="form-group">
                  <input
                    formControlName="password"
                    placeholder="Password"
                    class="form-control form-control-lg"
                    type="password"
                  />
                </fieldset>

                <button
                  class="btn btn-lg btn-primary pull-xs-right"
                  [disabled]="!authForm.valid"
                >
                  {{ title }}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AuthComponent implements OnInit {
  authType = '';
  title = '';
  errors: Errors = { errors: {} };
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe((data) => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = this.authType === 'login' ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = { errors: {} };

    const credentials = this.authForm.value;

    this.userService.attemptAuth(this.authType, credentials).subscribe(
      (_data) => this.router.navigateByUrl('/'),
      (err) => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}

/* eslint @typescript-eslint/no-unused-vars:0 */
