import { Component } from '@angular/core';

import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.sass'],
  providers: [RecipesService],
})
export class RecipesComponent {}
