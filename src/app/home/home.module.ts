import { NgModule } from '@angular/core';
import { SharedModule } from '@/shared';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeAuthResolver } from './home-auth.resolver';

@NgModule({
  imports: [SharedModule, HomeRoutingModule],
  declarations: [HomeComponent],
  providers: [HomeAuthResolver]
})
export class HomeModule {}
