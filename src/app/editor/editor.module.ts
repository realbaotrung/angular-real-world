import { AuthGuard } from '@/core';
import { NgModule } from '@angular/core';
import { SharedModule } from '@/shared';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { EditableArticleResolver } from './editable-article.resolver';

@NgModule({
  imports: [SharedModule, EditorRoutingModule],
  declarations: [EditorComponent],
  providers: [AuthGuard, EditableArticleResolver]
})
export class EditorModule {}
