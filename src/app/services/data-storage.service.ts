import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../common/recipe.model";
import { RecipeService } from "./recipe.service";
import { exhaustMap, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { FirebaseAuthService } from "./firebaseAuth.service";

@Injectable({
    providedIn: "root"
})
export class DataStorageService {
    
    constructor(private http: HttpClient, 
        private recipeService: RecipeService,
        private auth: FirebaseAuthService){}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes()
        this.http.put('https://recipe-book-12492-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe(
            (res) => {
                console.log(res)
            }
        )
    }

    deleteRecipe(id: number) {
        this.http.delete(
            `https://recipe-book-12492-default-rtdb.firebaseio.com/recipes/${id}.json`
        ).subscribe()
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(
                    'https://recipe-book-12492-default-rtdb.firebaseio.com/recipes.json'
                )
            .pipe(
                map(
                    (recipes) => {
                        recipes = recipes.filter(obj => obj!=null)
                        return recipes.map((recipe: Recipe) => {
                            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                        })
                    }
                ), tap(
                    (res) => {
                        this.recipeService.setRecipes(res)
                    }
                )
            )
        
    }
}