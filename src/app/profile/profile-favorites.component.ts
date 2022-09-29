import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleListConfig, Profile } from '../core';

@Component({
  selector: 'arw-profile-favorites',
  template: `
    <!-- TODO: Implement profile favorite -->
    <p>profile-favorites works!</p>
  `,
  styles: []
})
export class ProfileFavoritesComponent implements OnInit {
  profile!: Profile;
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
