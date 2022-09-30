import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleListConfig, Profile } from '../core';

@Component({
  selector: 'arw-profile-article',
  template: `
    <arw-article-list [limit]="10" [config]="articlesConfig"></arw-article-list>
  `,
  styles: []
})
export class ProfileArticlesComponent implements OnInit {
  profile: Profile = {} as Profile;
  articlesConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.profile = data['profile'];
      this.articlesConfig = {
        type: 'all',
        filters: {}
      };
      this.articlesConfig.filters.author = this.profile.username;
    });
  }
}
