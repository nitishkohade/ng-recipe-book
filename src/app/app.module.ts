import { ApplicationRef, NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { StructuralDirective } from './directives/structural.directive';
import { Pane } from './directives/pane.directive';
import { CustomPipe } from './pipes/custom.pipe';
import { HttpClientModule } from '@angular/common/http'
import { ImagePipe } from './pipes/image.pipe';
import { SharedModule } from './common/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
import { LoggingService } from './logging.service';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StructuralDirective,
    PageNotFoundComponent,
    Pane,
    CustomPipe,
    ImagePipe
  ],
  imports: [
    StoreModule.forRoot({
      shoppingList: shoppingListReducer
    }),
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    AuthModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  providers: [LoggingService]
})
export class AppModule { 
  constructor(private app: ApplicationRef, private zone: NgZone) {
  //   console.log(app)
  //   zone.runOutsideAngular(()=>{
  //     setTimeout(()=>{
  //        //this won't be reflected in the component view
  //        this.property = 5;

  //        //but if you run detection manually you will see the changes
  //        app.tick();
  //     })
  //  })
  }
}
