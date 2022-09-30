import { Article } from './../../core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'arw-article-preview',
  template: `
    <div class="article-preview">
      <arw-article-meta [article]="article">
        <arw-favorite-button
          [article]="article"
          (toggle)="onToggleFavorite($event)"
          class="pull-xs-right"
        >
          {{ article.favoritesCount }}
        </arw-favorite-button>
      </arw-article-meta>

      <a [routerLink]="['/article', article.slug]" class="preview-link">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
        <ul class="tag-list">
          <li
            class="tag-default tag-pill tag-outline"
            *ngFor="let tag of article.tagList"
          >
            {{ tag }}
          </li>
        </ul>
      </a>
    </div>
  `,
  styles: []
})
export class ArticlePreviewComponent {
  @Input() article: Article = {} as Article;

  onToggleFavorite(favorited: boolean) {
    this.article['favorited'] = favorited;

    if (favorited) {
      this.article['favoritesCount'] += 1;
    } else {
      this.article['favoritesCount'] -= 1;
    }
  }
}
