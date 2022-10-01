import { NgModule } from '@angular/core';
import { AuthGuard } from '@/core/guards';
import { SharedModule } from '@/shared';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [SettingsComponent],
  imports: [SharedModule, SettingsRoutingModule],
  providers: [AuthGuard]
})
export class SettingsModule {}
