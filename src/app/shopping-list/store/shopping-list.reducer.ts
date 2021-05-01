import { Ingredient } from "../../common/Ingredient.model";
import * as ShoppingListActions from './shopping-list.actions'

export interface State {
    ingredients: Ingredient[]
    editedIngredient: Ingredient
    editedIngredientIndex: number
}

const initialState: State = {
    ingredients: [
        new Ingredient("Apples", 4),
        new Ingredient("Oranges", 3)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
} 

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients, action.payload
                ]
            }
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients, ...action.payload
                ],
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        case ShoppingListActions.UPDATE_INGREDIENT:
            const updateIngredients = [...state.ingredients]
            updateIngredients[state.editedIngredientIndex] = action.payload.ingredient
            return {
                ...state,
                ingredients: updateIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            console.log(state.editedIngredientIndex)
            const ingredients = [...state.ingredients]
            ingredients.splice(state.editedIngredientIndex, 1)
            return {
                ...state,
                ingredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload]}
            }
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        default:
            return state
    }
}