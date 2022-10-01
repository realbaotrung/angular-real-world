import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ArticlesService, UserService } from '@/core/services';
import { Article } from '@/core/models';

@Injectable({
  providedIn: 'root'
})
export class EditableArticleResolver implements Resolve<Article> {
  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<any> {
    return this.articlesService.get(route.params['slug']).pipe(
      map((article) => {
        if (
          this.userService.getCurrentUser().username === article.author.username
        ) {
          return article;
        }
        this.router.navigateByUrl('/');
        return {} as Article;
      }),
      catchError((err) => this.router.navigateByUrl('/'))
    );
  }
}
/*
eslint
  @typescript-eslint/no-explicit-any:0,
  @typescript-eslint/no-unused-vars:0
*/
