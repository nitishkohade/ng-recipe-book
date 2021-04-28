import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../common/shared.module";
import { LoggingService } from "../logging.service";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        SharedModule,
        ShoppingListRoutingModule,
        FormsModule
    ],
    // To check how angular load services differently
    providers: [LoggingService]

}) 
export class ShoppingListModule {}