import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'arw-layout-footer',
  template: ` <p>footer works!</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
