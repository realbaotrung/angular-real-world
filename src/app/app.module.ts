import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@/app-routing.module';
import { AppComponent } from '@/app.component';
import { SharedModule, HeaderComponent, FooterComponent } from '@/shared';
import { CoreModule } from '@/core';
import { HomeModule } from '@/home/home.module';
import { AuthModule } from '@/auth/auth.module';
import { SettingsModule } from '@/setting/settings.module';
import { EditorModule } from '@/editor/editor.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

/**
 * https://www.tektutorialshub.com/angular/angular-folder-structure-best-practices/
 */
@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AppRoutingModule,
    AuthModule,
    SettingsModule,
    EditorModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
