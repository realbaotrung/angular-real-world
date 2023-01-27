import { ArticlesService } from './services/articles.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApiService,
  UserService,
  JwtService,
  TagsService,
  CommentsService,
  ProfilesService
} from './services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokensInterceptor } from './interceptors/http-tokens.interceptor';
import { AuthGuard } from './guards';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokensInterceptor,
      multi: true
    },
    AuthGuard,
    ApiService,
    JwtService,
    UserService,
    TagsService,
    ArticlesService,
    CommentsService,
    ProfilesService
  ],
  declarations: []
})
export class CoreModule {
  /**
   * The following code will stop the other modules from importing
   * the CoreModule
   */
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the roo module');
    }
  }
}
