import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from '../shared/shared.module';

// import { LoggingService } from '../logging.service';

@NgModule({
  imports: [FormsModule, ShoppingRoutingModule, SharedModule],
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  // Since this module is lazy-loaded, this will be a different instance from
  // the root instance.
  // providers: [LoggingService],
})
export class ShoppingListModule {}
