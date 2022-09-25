import { ArticlesService } from './services/articles.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, UserService, JwtService, TagsService } from './services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokensInterceptor } from './interceptors/http-tokens.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokensInterceptor,
      multi: true
    },
    ApiService,
    JwtService,
    UserService,
    TagsService,
    ArticlesService
  ],
  declarations: []
})
export class CoreModule {}
