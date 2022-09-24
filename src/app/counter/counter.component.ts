import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'arw-counter',
  template: `
    <button (click)="decrement()">-</button>
    <span data-testid="count">Current Count: {{ counter }}</span>
    <button (click)="increment()">+</button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  @Input() counter = 0;

  increment() {
    this.counter += 1;
  }

  decrement() {
    this.counter -= 1;
  }
}
