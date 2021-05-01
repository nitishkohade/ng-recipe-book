import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChange, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/common/Ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions'
import * as fromShoppingList from '../store/shopping-list.reducer'
import * as fromApp from "../../store/app.reducer";


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  // styleUrls: ['./shopping-edit.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
  // encapsulation: ViewEncapsulation.None
})
export class ShoppingEditComponent{

 @ViewChild('nameInput') nameInputRef: ElementRef;
 @ViewChild('amountInput') amountInputRef: ElementRef;

 // @ContentChild('content') contentChild: ElementRef;

 @ViewChild('f') shoppingForm: NgForm;

 subscription: Subscription
 editMode = false;
 editedItem: Ingredient;

 @Input() value: {name: string, age: number};

  constructor(
    private ChangeDetectorRef: ChangeDetectorRef,
    private store: Store<fromApp.AppState>) {
    console.log("constructor")
   }

  ngOnChanges(m: SimpleChange) {
    console.log("on changes")
    console.log(m)
  }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(
      stateData => {
        if(stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient
          this.shoppingForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        } else {
          this.editMode = false;
          this.editedItem = stateData.editedIngredient
        }
      }
    )
    console.log("on init");
    // this.ChangeDetectorRef.detach()
    // this.subscription = this.shoppingListService.startedEditing
    //   .subscribe((index: number) => {
    //     this.editMode = true;
    //     this.editedItemIndex = index;
    //     this.editedItem = this.shoppingListService.getIngredient(index);
    // })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingredient: Ingredient = new Ingredient(value.name, value.amount)
    if(this.editMode) {
      //this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient)
     this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient}))

    } else {
     // this.shoppingListService.addIngredient(ingredient)
     this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient))
    }
    this.editMode = false;
    this.shoppingForm.reset()
  }

  onClear() {
    this.editMode = false;
    this.shoppingForm.reset()
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }

  onDelete() {
    // this.shoppingListService.deleteIngredient(this.editedItemIndex)
    this.store.dispatch(new ShoppingListActions.DeleteIngredient())
    this.onClear()
  }

  ngDoCheck() {
    // console.log("ng do check")
  }

  ngAfterContentInit() {
   // console.log(this.contentChild)
    // console.log("ng after content init")
  }

  ngAfterContentChecked() {
   // console.log(this.contentChild)
    // console.log("ng after content checked")
  }

  ngAfterViewInit() {
   // console.log(this.nameInputRef)
    // console.log("ng after view init")
  }

  ngAfterViewChecked() {
  //  console.log(this.nameInputRef)
    // console.log("ng after view checked")
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }
}
