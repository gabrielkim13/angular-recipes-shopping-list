import { Recipe } from '../recipe.model';

import * as RecipesActions from './recipes.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function recipesReducer(
  state = initialState,
  action: RecipesActions.RecipesActions,
): State {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return { ...state, recipes: [...action.payload] };

    case RecipesActions.ADD_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };

    case RecipesActions.UPDATE_RECIPE:
      const { index: updateIndex, recipe: updateRecipe } = action.payload;

      return {
        ...state,
        recipes: state.recipes.map((recipe, index) =>
          index === updateIndex ? { ...recipe, ...updateRecipe } : recipe,
        ),
      };

    case RecipesActions.DELETE_RECIPE:
      const deleteIndex = action.payload;

      return {
        ...state,
        recipes: state.recipes.filter((_, index) => index !== deleteIndex),
      };

    default:
      return state;
  }
}
