import { Component } from '@angular/core';

@Component({
  selector: 'arw-layout-footer',
  template: `
    <footer>
      <div class="container">
        <a class="logo-font" routerLink="/">conduit</a>
        <span class="attribution">
          &copy; {{ today | date: 'yyyy' }} An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code licensed under MIT
        </span>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {
  today: number = Date.now();
}
