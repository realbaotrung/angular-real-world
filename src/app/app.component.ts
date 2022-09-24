import { Component, OnInit } from '@angular/core';
import { UserService } from './core/services';

@Component({
  selector: 'arw-root',
  template: `
    <arw-layout-header></arw-layout-header>
    <router-outlet></router-outlet>
    <arw-layout-footer></arw-layout-footer>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.populate();
  }
}
