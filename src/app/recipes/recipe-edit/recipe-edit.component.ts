import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/common/Ingredient.model';
import { Recipe } from 'src/app/common/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup

  constructor(private route: ActivatedRoute, 
    private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm()
        }
      )
  }

  onSubmit() {
    const value = this.recipeForm.value;
    const ingredients: Ingredient[] = [];
    this.recipeForm.value['ingredients'].forEach(obj => {
      ingredients.push(new Ingredient(obj.name, obj.amount))
    })
    const newRecipe = new Recipe(
      value['name'],
      value['description'],
      value['imagePath'],
      ingredients
    );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe)
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel()
  }

  private initForm() {
    let recipeName = ''
    let recipeImagePath = ''
    let recipeDescription = ''
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name
      recipeDescription = recipe.description
      recipeImagePath = recipe.imagePath
      recipe.ingredients.forEach((obj) => {
        recipeIngredients.push(
          new FormGroup({
            name: new FormControl(obj.name, Validators.required),
            amount: new FormControl(obj.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
        )
      })
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      ingredients: recipeIngredients
    })
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onCancel() {
    this.router.navigate(["../"], {relativeTo: this.route})
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index)
  }

  onClearIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).clear()
  }
}
