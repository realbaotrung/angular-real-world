import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TagsService } from '@/core/services';
import { ArticleListConfig } from '@/core/models';

@Component({
  selector: 'arw-home',
  template: `
    <div class="home-page">
      <div *arwShowAuthed="false" class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your <i>Angular</i> knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <a
                    class="nav-link"
                    [ngClass]="{ active: listConfig.type === 'feed' }"
                    (click)="setListTo('feed')"
                    >Your Feed</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    [ngClass]="{
                      active:
                        listConfig.type === 'all' && !listConfig.filters.tag
                    }"
                    (click)="setListTo('all')"
                    >Global Feed</a
                  >
                </li>
                <li class="nav-item" [hidden]="!listConfig.filters.tag">
                  <a class="nav-link active">
                    <i class="ion-pound"></i> {{ listConfig.filters.tag }}
                  </a>
                </li>
              </ul>
            </div>

            <arw-article-list
              [limit]="10"
              [config]="listConfig"
            ></arw-article-list>
          </div>

          <div class="col-md-3">
            <div class="sidebar" *ngIf="tags">
              <p>Popular Tags</p>

              <div class="tag-list">
                <a
                  *ngFor="let tag of tags; trackBy: trackByTagName"
                  (click)="setListTo('all', { tag: tag })"
                  class="tag-default tag-pill"
                >
                  {{ tag }}
                </a>
              </div>

              <div [hidden]="tagsLoaded">Loading tags...</div>

              <div [hidden]="!tagsLoaded || tags.length > 0">
                No tags are here... yet.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .nav-link {
        cursor: pointer;
      }

      .tag-pill {
        cursor: pointer;
      }
    `
  ]
})
export class HomeComponent implements OnInit {
  isAuthenticated?: boolean;
  listConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };
  tags: string[] = [];
  tagsLoaded = false;

  constructor(
    private router: Router,
    private tagsService: TagsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // see: https://angular.io/api/router/Resolve
    this.activatedRoute.data.subscribe((data) => {
      this.isAuthenticated = data['isAuthenticated'];

      // set the article list accordingly
      if (data['isAuthenticated']) {
        this.setListTo('feed');
      } else {
        this.setListTo('all');
      }
    });

    this.tagsService.getAll().subscribe((tags) => {
      this.tags = [...tags];
      this.tagsLoaded = true;
    });
  }

  setListTo(type: string = '', filters = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Otherwise, set the list object
    this.listConfig = { type: type, filters: filters };
  }

  trackByTagName(_: number, tag: string): string {
    return tag;
  }
}

/* eslint @typescript-eslint/no-explicit-any:0 */
