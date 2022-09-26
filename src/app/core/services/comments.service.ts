import { map } from 'rxjs/operators';
import { Comment } from './../models';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(private apiService: ApiService) {}

  add(slug: string, payload: any): Observable<Comment> {
    return this.apiService
      .post(`/articles'/${slug}/comments`, { comment: { body: payload } })
      .pipe(map((data) => data.comment));
  }

  getAll(slug: string): Observable<Comment[]> {
    return this.apiService
      .get(`/articles/${slug}/comments`)
      .pipe(map((data) => data.comments));
  }

  destroy(commentId: string, articleSlug: string) {
    return this.apiService.delete(
      `/articles/${articleSlug}/comments/${commentId}`
    );
  }
}

/* eslint @typescript-eslint/no-explicit-any:0 */
