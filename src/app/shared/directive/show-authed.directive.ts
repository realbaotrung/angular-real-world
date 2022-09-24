import { UserService } from './../../core/services';
import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({ selector: '[arwShowAuthed]' })
export class ShowAuthedDirective implements OnInit {
  condition: boolean;

  @Input() set arwShowAuthed(condition: boolean) {
    this.condition = condition;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe((isAuthenticated) => {
      if (
        (isAuthenticated && this.condition) ||
        (!isAuthenticated && !this.condition)
      ) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}

/* eslint @typescript-eslint/no-explicit-any:0 */
