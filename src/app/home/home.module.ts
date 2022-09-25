import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeAuthResolverService } from './home-auth-resolver.service';

@NgModule({
  imports: [SharedModule, HomeRoutingModule],
  declarations: [HomeComponent],
  providers: [HomeAuthResolverService]
})
export class HomeModule {}
