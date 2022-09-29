import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService, Comment, User } from '../core';

@Component({
  selector: 'arw-article-comment',
  template: `
    <div class="card">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <a
          class="comment-author"
          [routerLink]="['/profile', comment.author.username]"
        >
          <img [src]="comment.author.image" [alt]="comment.author.username" />
        </a>
        &nbsp;
        <a [routerLink]="['/profile', comment.author.username]">
          {{ comment.author.username }}
        </a>
        <span class="data-posted">
          {{ comment.createdAt | date: 'longDate' }}
        </span>
        <span class="mod-options" [hidden]="!canModify">
          <i class="ion-trash-a" (click)="deleteClicked()"></i>
        </span>
      </div>
    </div>
  `,
  styles: []
})
export class ArticleCommentComponent implements OnInit, OnDestroy {
  @Input() comment!: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();

  private subscription!: Subscription;

  canModify = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Load the current user's data
    this.subscription = this.userService.currentUser.subscribe(
      (userData: User) => {
        this.canModify = userData.username === this.comment.author.username;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }
}
