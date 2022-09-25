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
import { FavoriteButtonComponent } from './buttons';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    ShowAuthedDirective,
    ArticleListComponent,
    ArticlePreviewComponent,
    ArticleMetaComponent,
    FavoriteButtonComponent
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ShowAuthedDirective,
    ArticleListComponent
  ]
})
export class SharedModule {}
