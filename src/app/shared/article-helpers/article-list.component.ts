import { Component, Input } from '@angular/core';
import { Article, ArticleListConfig, ArticlesService } from '../../core';

@Component({
  selector: 'arw-article-list',
  template: `
    <arw-article-preview
      *ngFor="let article of results"
      [article]="article"
    ></arw-article-preview>

    <div class="app-article-preview" [hidden]="!loading">
      Loading articles...
    </div>

    <div class="app-artilce-preview" [hidden]="loading || results.length">
      No articles are here... yet.
    </div>

    <nav [hidden]="loading || totalPages.length <= 1">
      <ul class="pagination">
        <li
          class="page-item"
          [ngClass]="{ active: pageNumber === currentPage }"
          *ngFor="let pageNumber of totalPages"
          (click)="setPageTo(pageNumber)"
        >
          <a class="page-link">{{ pageNumber }}</a>
        </li>
      </ul>
    </nav>
  `,
  styles: [
    `
      .page-link {
        cursor: pointer;
      }
    `
  ]
})
export class ArticleListComponent {
  @Input() limit = 10;
  @Input() set config(config: ArticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }
  query!: ArticleListConfig;
  results!: Article[];
  loading = false;
  currentPage = 1;
  totalPages: number[] = [1];

  constructor(private articlesService: ArticlesService) {}

  setPageTo(pageNumber: number) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    // Create limit and offset filter
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = this.limit * (this.currentPage - 1);
    }

    this.articlesService.query(this.query).subscribe((data) => {
      this.loading = false;
      this.results = data.articles;

      this.totalPages = Array.from(
        new Array(Math.ceil(data.articlesCount / (this.limit as number))),
        (_, index) => index + 1
      );
    });
  }
}
