import { NgModule } from '@angular/core';
import { SharedModule } from './../shared';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './profile.resolver';
import { ProfileArticlesComponent } from './profile-articles.component';
import { ProfileFavoritesComponent } from './profile-favorites.component';

@NgModule({
  imports: [SharedModule, ProfileRoutingModule],
  declarations: [
    ProfileComponent,
    ProfileArticlesComponent,
    ProfileFavoritesComponent
  ],
  providers: [ProfileResolver]
})
export class ProfileModule {}
