import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../services/auth-guard.service";
import { RecipeResolverService } from "../services/recipe-resolver.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

const appRoutes: Routes = [
    {path: '', resolve: [RecipeResolverService], 
    // canActivateChild: [AuthGuardService],
    //  canActivate: [AuthGuardService], 
      canActivate: [AuthGuardService],
     component: RecipesComponent, 
     children: [
      {path: '', component: RecipeStartComponent,
      // canDeactivate: [CanDeactivateGuardService]
      },
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]}
    ]}
  ]

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
        // RouterModule.forRoot(appRoutes, {useHash: true})
    ],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}