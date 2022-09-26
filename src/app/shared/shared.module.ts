import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowAuthedDirective } from './directive/show-authed.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ArticleListComponent,
  ArticlePreviewComponent,
  ArticleMetaComponent
} from './article-helpers';
import { FavoriteButtonComponent, FollowButtonComponent } from './buttons';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    ShowAuthedDirective,
    ArticleListComponent,
    ArticlePreviewComponent,
    ArticleMetaComponent,
    FavoriteButtonComponent,
    FollowButtonComponent
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ShowAuthedDirective,
    ArticleMetaComponent,
    ArticleListComponent,
    FavoriteButtonComponent,
    FollowButtonComponent
  ]
})
export class SharedModule {}
