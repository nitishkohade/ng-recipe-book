import { ChangeDetectionStrategy, Component, OnInit, SimpleChange, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from '../common/Ingredient.model';
import { LoggingService } from '../logging.service';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];
  obj: {name: string, age: number} = {name: "kloj", age: 23}

  private subscription: Subscription

  constructor(private shoppingListService: ShoppingListService, 
    private loggingService: LoggingService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService
        .ingredientAdded
        .subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients
    })
    this.ingredients = this.shoppingListService.getIngredients();
    this.loggingService.printLog("hello from shopping list component ngOninit")
    this.store.select('shoppingList')
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index)
  }

  ngOnDestroy() {
    // console.log("called...............")
    this.subscription.unsubscribe();
  }

  // ngOnChanges(m: SimpleChange) {
  //   console.log("on changes")
  //   console.log(m)
  // }

  // ngDoCheck() {
  //   console.log("ng do check")
  // }

  // ngAfterContenInit() {
  //   console.log("ng after View init")
  // }

  // ngAfterContentChecked() {
  //   console.log("ng after content checked")
  // }

  // ngAfterViewInit() {
  //   console.log("ng after view init")
  // }

  // ngAfterViewChecked() {
  //   console.log("ng after view checked")
  // }

  experimentChangeDetectionImm() {
    this.obj.name = "wertyuio"
  }

}
