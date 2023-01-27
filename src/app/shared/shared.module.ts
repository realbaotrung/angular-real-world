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
import { ListErrorsComponent } from './list-errors';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    ShowAuthedDirective,
    ArticleListComponent,
    ArticlePreviewComponent,
    ArticleMetaComponent,
    FavoriteButtonComponent,
    FollowButtonComponent,
    ListErrorsComponent
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
    ArticlePreviewComponent,
    FavoriteButtonComponent,
    FollowButtonComponent,
    ListErrorsComponent
  ]
})
export class SharedModule {}
