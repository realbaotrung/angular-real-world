import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleListConfig, Profile } from '@/core/models';

@Component({
  selector: 'arw-profile-favorites',
  template: `
    <arw-article-list
      [limit]="10"
      [config]="favoritesConfig"
    ></arw-article-list>
  `,
  styles: []
})
export class ProfileFavoritesComponent implements OnInit {
  profile: Profile = {} as Profile;
  favoritesConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.data.subscribe((data) => {
      this.profile = data['profile'];
      this.favoritesConfig.filters.favorited = this.profile.username;
    });
  }
}
