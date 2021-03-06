import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [FormsModule, AuthRoutingModule, SharedModule],
  declarations: [AuthComponent],
  exports: [AuthComponent],
})
export class AuthModule {}
