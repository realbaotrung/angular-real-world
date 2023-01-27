import { AfterViewInit, Component, Input } from '@angular/core';
import { Article } from '@/core';
import { HttpUrlEncodingCodec } from '@angular/common/http';

@Component({
  selector: 'arw-article-meta',
  template: `
    <div class="article-meta">
      <a [routerLink]="['/profile', encodeAuthorName]">
        <img [src]="article.author.image" [alt]="article.author.username" />
      </a>

      <div class="info">
        <a class="author" [routerLink]="['/profile', encodeAuthorName]">
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
export class ArticleMetaComponent implements AfterViewInit {
  @Input() article: Article = {} as Article;

  encodeAuthorName = '';

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.encodeAuthorName = new HttpUrlEncodingCodec().encodeValue(
        this.article.author.username
      );
    }, 0);
  }
}
