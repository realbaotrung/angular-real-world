import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Errors } from '@/core/models';

@Component({
  selector: 'arw-list-errors',
  template: `
    <ul *ngIf="errorList" class="error-messages">
      <li *ngFor="let error of errorList">
        {{ error }}
      </li>
    </ul>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListErrorsComponent {
  formattedErrors: string[] = [];

  @Input() set errors(errorList: Errors | Record<string, never>) {
    this.formattedErrors = Object.keys(errorList.errors || {}).map(
      (key) => `${key} ${errorList.errors[key]}`
    );
  }

  get errorList() {
    return this.formattedErrors;
  }
}
