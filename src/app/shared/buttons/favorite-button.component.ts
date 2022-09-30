import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { ArticlesService, UserService, Article } from './../../core';

@Component({
  selector: 'arw-favorite-button',
  template: `
    <button
      class="btn btn-sm"
      [ngClass]="{
        disable: isSubmitting,
        'btn-outline-primary': !article.favorited,
        'btn-primary': article.favorited
      }"
      (click)="toggleFavorite()"
    >
      <i class="ion-heart"></i>
      <ng-content></ng-content>
    </button>
  `,
  styles: []
})
export class FavoriteButtonComponent {
  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  @Input() article: Article = {} as Article;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated
      .pipe(
        concatMap((authenticated) => {
          // Not authenticated => push to login screen
          if (!authenticated) {
            this.router.navigateByUrl('/login');
            return of(null);
          }

          // Favorite the article if it isn't favorited yet
          if (!this.article.favorited) {
            return this.articlesService.favorite(this.article.slug).pipe(
              tap(
                (_data) => {
                  this.isSubmitting = false;
                  this.toggle.emit(true);
                },
                (_error) => (this.isSubmitting = false)
              )
            );
          } else {
            return this.articlesService.unfavorite(this.article.slug).pipe(
              tap(
                (_data) => {
                  this.isSubmitting = false;
                  this.toggle.emit(false);
                },
                (_error) => {
                  this.isSubmitting = false;
                }
              )
            );
          }
        })
      )
      .subscribe();
  }
}

/* eslint @typescript-eslint/no-unused-vars:0 */
