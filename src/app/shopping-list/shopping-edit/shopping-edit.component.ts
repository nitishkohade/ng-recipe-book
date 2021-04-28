import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChange, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/common/Ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

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
 editedItemIndex: number;
 editedItem: Ingredient;

 @Input() value: {name: string, age: number};

  constructor(private shoppingListService: ShoppingListService,
    private ChangeDetectorRef: ChangeDetectorRef) {
    console.log("constructor")
   }

  ngOnChanges(m: SimpleChange) {
    console.log("on changes")
    console.log(m)
  }

  ngOnInit(): void {
    console.log("on init");
    // this.ChangeDetectorRef.detach()
    this.subscription = this.shoppingListService.startedEditing
      .subscribe((index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
    })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingredient: Ingredient = new Ingredient(value.name, value.amount)
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient)
    } else {
      this.shoppingListService.addIngredient(ingredient)
    }
    this.editMode = false;
    this.shoppingForm.reset()
  }

  onClear() {
    this.editMode = false;
    this.shoppingForm.reset()
  }

  onDelete() {
    this.onClear()
    this.shoppingListService.deleteIngredient(this.editedItemIndex)
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
  }
}
