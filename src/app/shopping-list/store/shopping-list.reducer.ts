import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from '../../shared/ingredient.model';

export interface State {
  editedIngredient: Ingredient | null;
  editedIngredientIndex: number;
  ingredients: Ingredient[];
}

const initialState: State = {
  editedIngredientIndex: -1,
  editedIngredient: null,
  ingredients: [
    new Ingredient('Ingredient 1', 1),
    new Ingredient('Ingredient 2', 2),
    new Ingredient('Ingredient 3', 3),
  ] as Ingredient[],
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions,
): State {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient, index) =>
          index === state.editedIngredientIndex
            ? { ...ingredient, ...action.payload }
            : ingredient,
        ),
        editedIngredient: null,
        editedIngredientIndex: -1,
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (_, index) => index !== state.editedIngredientIndex,
        ),
        editedIngredient: null,
        editedIngredientIndex: -1,
      };

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredient: { ...state.ingredients[action.payload] },
        editedIngredientIndex: action.payload,
      };

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };

    default:
      return state;
  }
}
