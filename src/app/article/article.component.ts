import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Article,
  User,
  Comment,
  ArticlesService,
  UserService,
  CommentsService
} from '../core';

@Component({
  selector: 'arw-article',
  template: `
    <div class="article-page">
      <div class="banner">
        <div class="container">
          <h1>{{ article.title }}</h1>

          <arw-article-meta [article]="article">
            <span [hidden]="!canModify">
              <a
                class="btn btn-sm btn-outline-secondary"
                [routerLink]="['/editor', article.slug]"
              >
                <i class="ion-edit"></i> Edit Article
              </a>

              <button
                class="btn btn-sm btn-outline-danger"
                [ngClass]="{ disabled: isDeleting }"
                (click)="deleteArticle()"
              >
                <i class="ion-trash-a"></i> Delete Article
              </button>
            </span>

            <span [hidden]="canModify">
              <arw-follow-button
                [profile]="article.author"
                (toggle)="onToggleFollowing($event)"
              >
              </arw-follow-button>

              <arw-favorite-button
                [article]="article"
                (toggle)="onToggleFavorite($event)"
              >
                {{ article.favorited ? 'Unfavorite' : 'Favorite' }} Article
                <span class="counter">({{ article.favoritesCount }})</span>
              </arw-favorite-button>
            </span>
          </arw-article-meta>
        </div>
      </div>

      <div class="container page">
        <div class="row article-content">
          <div class="col-md-12">
            <div [innerHTML]="article.body | markdown"></div>

            <ul class="tag-list">
              <li
                *ngFor="let tag of article.tagList; trackBy: trackByTag"
                class="tag-default tag-pill tag-outline"
              >
                {{ tag }}
              </li>
            </ul>
          </div>
        </div>

        <hr />

        <div class="article-actions">
          <arw-article-meta [article]="article">
            <span [hidden]="!canModify">
              <a
                class="btn btn-sm btn-ouline-secondary"
                [routerLink]="['/editor', article.slug]"
              >
                <i class="ion-edit"></i> Edit Article
              </a>

              <button
                class="btn btn-sm btn-ouline-danger"
                [ngClass]="{ disabled: isDeleting }"
                (click)="deleteArticle()"
              >
                <i class="ion-trash-a"></i> Delete Article
              </button>
            </span>

            <span [hidden]="canModify">
              <arw-follow-button
                [profile]="article.author"
                (toggle)="onToggleFollowing($event)"
              >
              </arw-follow-button>

              <arw-favorite-button
                [article]="article"
                (toggle)="onToggleFavorite($event)"
              >
                {{ article.favorited ? 'Unfavorite' : 'Favorite' }} Article
                <span class="counter">({{ article.favoritesCount }})</span>
              </arw-favorite-button>
            </span>
          </arw-article-meta>
        </div>

        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <div *arwShowAuthed="true">
              <arw-list-errors [errors]="commentFormErrors"></arw-list-errors>

              <form class="card comment-form" (ngSubmit)="addComment()">
                <fieldset [disabled]="isSubmitting">
                  <div class="card-block">
                    <textarea
                      class="form-control"
                      placeholder="Write a comment..."
                      rows="3"
                      [formControl]="commentControl"
                    ></textarea>
                  </div>
                  <div class="card-footer">
                    <img class="comment-author-img" [src]="currentUser.image" />
                    <button class="btn btn-sm btn-primary" type="summit">
                      Post Comment
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>

            <div *arwShowAuthed="false">
              <a [routerLink]="['/login']">Sign in</a>
              or
              <a [routerLink]="['/register']">sign up</a>
              to add comments on this article
            </div>

            <arw-article-comment
              *ngFor="let comment of comments"
              [comment]="comment"
              (deleteComment)="onDeleteComment(comment)"
            >
            </arw-article-comment>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ArticleComponent implements OnInit {
  article: Article = {} as Article;
  currentUser: User = {} as User;
  canModify = false;
  comments: Comment[] = [] as Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private articlesService: ArticlesService,
    private commentsService: CommentsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Retrieve the prefetched article
    this.activatedRoute.data.subscribe((data) => {
      this.article = data['article'];

      // Load the comments on this article
      this.populateComments();
    });

    // Load the current user's data
    this.userService.currentUser.subscribe((userData: User) => {
      this.currentUser = userData;
      this.canModify =
        this.currentUser.username === this.article.author.username;
    });
  }

  populateComments() {
    this.commentsService.getAll(this.article.slug).subscribe((comments) => {
      this.comments = comments;
    });
  }

  onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;

    if (favorited) {
      this.article.favoritesCount += 1;
    } else {
      this.article.favoritesCount -= 1;
    }
  }

  onToggleFollowing(following: boolean) {
    this.article.author.following = following;
  }

  deleteArticle() {
    this.isDeleting = true;
    this.articlesService.destroy(this.article.slug).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};

    const commentBody = this.commentControl.value;
    this.commentsService.add(this.article.slug, commentBody).subscribe(
      (comment) => {
        this.comments.unshift(comment);
        this.commentControl.reset('');
        this.isSubmitting = false;
      },
      (error) => {
        this.isSubmitting = false;
        this.commentFormErrors = error;
      }
    );
  }

  onDeleteComment(comment: any) {
    this.commentsService
      .destroy(comment.id, this.article.slug)
      .subscribe((_success) => {
        this.comments = this.comments.filter((item) => item.id !== comment.id);
      });
  }

  trackByTag(_: number, tag: string): string {
    return tag;
  }
}

/*
eslint
  @typescript-eslint/no-unused-vars:0,
  @typescript-eslint/no-explicit-any:0
*/
