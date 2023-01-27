import { catchError, tap } from 'rxjs/operators';
import { ArticlesService } from './../core/services/articles.service';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '@/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolver implements Resolve<Article> {
  constructor(
    private articlesService: ArticlesService,
    private router: Router
  ) {}

  resolve(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<any> {
    return this.articlesService
      .get(_route.paramMap.get('slug') as string)
      .pipe(catchError((_err) => this.router.navigateByUrl('/')));
  }
}

/*
eslint
  @typescript-eslint/no-explicit-any:0,
  @typescript-eslint/no-unused-vars:0
*/
