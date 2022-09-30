import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { UserService } from './../../core/services';

@Directive({ selector: '[arwShowAuthed]' })
export class ShowAuthedDirective implements OnInit {
  @Input() set arwShowAuthed(condition: boolean) {
    this.condition = condition;
  }

  condition = false;

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
