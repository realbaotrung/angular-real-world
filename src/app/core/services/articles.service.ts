import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Article, ArticleListConfig } from '../models';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface IStringIndex {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private url = '/articles';

  constructor(private apiService: ApiService) {}

  /**
   * Get articles and its count based on filter
   * @param config
   * @returns
   */
  query(
    config: ArticleListConfig
  ): Observable<{ articles: Article[]; articlesCount: number }> {
    // Convert any filters over to Angular's URLSearchParams
    const params: IStringIndex = {};

    Object.keys(config.filters).forEach((key) => {
      params[key] = (config.filters as IStringIndex)[key];
    });

    return this.apiService.get(
      this.url + (config.type === 'feed' ? '/feed' : ''),
      new HttpParams({ fromObject: params })
    );
  }

  /**
   * Get article
   * @param slug
   * @returns
   */
  get(slug: string): Observable<Article> {
    return this.apiService
      .get(this.url + '/' + slug)
      .pipe(map((data) => data.article));
  }

  destroy(slug: string): Observable<any> {
    return this.apiService.delete(this.url + '/' + slug);
  }

  save(article: Article): Observable<Article> {
    // If we're updating an existing article
    if (article.slug) {
      return this.apiService
        .put(this.url + article.slug, { article: article })
        .pipe(map((data) => data.article));
      // Otherwise, create a new article
    } else {
      return this.apiService
        .post(this.url + '/', { article: article })
        .pipe(map((data) => data.article));
    }
  }

  favorite(slug: string): Observable<Article> {
    return this.apiService.post(this.url + '/' + slug + '/favorite');
  }

  unfavorite(slug: string): Observable<any> {
    return this.apiService.delete(this.url + '/' + slug + '/favorite');
  }
}

/* eslint @typescript-eslint/no-explicit-any:0 */
