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

  add(slug: string, body: string): Observable<Comment> {
    return this.apiService
      .post(`/articles'/${slug}/comments`, { comment: { body } })
      .pipe(map((data) => data.comment as Comment));
  }

  getAll(slug: string): Observable<Comment[]> {
    return this.apiService
      .get(`/articles/${slug}/comments`)
      .pipe(map((data) => data.comments as Comment[]));
  }

  destroy(commentId: string, articleSlug: string) {
    return this.apiService.delete(
      `/articles/${articleSlug}/comments/${commentId}`
    );
  }
}

/* eslint @typescript-eslint/no-explicit-any:0 */
