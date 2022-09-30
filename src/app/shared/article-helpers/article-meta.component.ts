import { Article } from './../../core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'arw-article-meta',
  template: `
    <div class="article-meta">
      <a [routerLink]="['/profile', article.author.username]">
        <img [src]="article.author.image" [alt]="article.author.username" />
      </a>

      <div class="info">
        <a class="author" [routerLink]="['/profile', article.author.username]">
          {{ article.author.username }}
        </a>
        <span class="date">
          {{ article.createdAt | date: 'longDate' }}
        </span>
      </div>

      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class ArticleMetaComponent {
  @Input() article: Article = {} as Article;
}
