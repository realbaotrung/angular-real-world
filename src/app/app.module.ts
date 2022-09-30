import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule, HeaderComponent, FooterComponent } from './shared';
import { CoreModule } from './core';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './setting/settings.module';
import { EditorModule } from './editor/editor.module';

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
    EditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
