import { NgModule } from '@angular/core';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { SharedModule } from '../shared';
import { MarkdownPipe } from './markdown.pipe';
import { ArticleResolver } from './article.resolver';
import { ArticleCommentComponent } from './article-comment.component';

@NgModule({
  imports: [SharedModule, ArticleRoutingModule],
  declarations: [ArticleComponent, MarkdownPipe, ArticleCommentComponent],
  providers: [ArticleResolver]
})
export class ArticleModule {}
