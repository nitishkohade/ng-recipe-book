import { Ingredient } from "../../common/Ingredient.model";
import * as ShoppingListActions from './shopping-list.actions'

const initialState = {
    ingredients: [
        new Ingredient("Apples", 4),
        new Ingredient("Oranges", 3)
    ]
} 

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients, action.payload
                ]
            }
    }
}