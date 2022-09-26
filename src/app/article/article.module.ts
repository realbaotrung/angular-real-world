import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ArticleComponent } from './article.component';
import { SharedModule } from '../shared';

@NgModule({
  imports: [RouterModule, SharedModule],
  declarations: [ArticleComponent]
})
export class ArticleModule {}
