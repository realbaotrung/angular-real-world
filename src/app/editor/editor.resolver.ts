import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Article } from '@/core/models';
import { ArticlesService } from '@/core/services';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../core';

@Injectable({
  providedIn: 'root'
})
export class EditorResolver implements Resolve<boolean> {
  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<any> {
    return this.articlesService.get(route.paramMap.get('slug') as string).pipe(
      map((article) => {
        if (
          this.userService.getCurrentUser().username === article.author.username
        ) {
          return article;
        }
        this.router.navigateByUrl('/');
        return {} as Article;
      }),
      catchError((_err) => this.router.navigateByUrl('/'))
    );
  }
}

/*
eslint
  @typescript-eslint/no-unused-vars:0,
  @typescript-eslint/no-explicit-any:0
*/
