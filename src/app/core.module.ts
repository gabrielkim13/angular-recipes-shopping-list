import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AuthInterceptor } from './auth/auth-interceptor';
import { RecipesService } from './recipes/recipes.service';

@NgModule({
  providers: [
    RecipesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
