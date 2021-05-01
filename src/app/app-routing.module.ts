import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ServerResolverService } from './services/server-resolver.service';


const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', loadChildren: () => import("./recipes/recipes.module").then(m => m.RecipesModule)},
    {path: 'shopping-list', loadChildren: () => import("./shopping-list/shopping-list.module").then(m => m.ShoppingListModule)},
    {path: 'notFound', component: PageNotFoundComponent, 
      data: {message: 'Page not found'}, 
      resolve: {server: ServerResolverService}
    },
    {path: '**', redirectTo: "/notFound"}
  ]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}