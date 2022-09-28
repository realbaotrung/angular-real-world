import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowAuthedDirective } from './directive';
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
