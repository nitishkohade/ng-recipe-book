import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pane } from '../directives/pane.directive';
import { AuthService } from '../services/auth.service';
import { DataStorageService } from '../services/data-storage.service';
import { FirebaseAuthService } from '../services/firebaseAuth.service';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  //@Output() featureSelected = new EventEmitter<string>();

  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }

  isAuthenticated = false;
  userSub: Subscription

  @ViewChildren(Pane) panes!: QueryList<Pane>;

  vAny: any = 10;
  vUnknown: unknown = 10;

  //////////////////////////
  s1: string = this.vAny
  // s2: string = this.vUnknown
   s2: string = this.vUnknown as string

   pageNumber: string = '1'
   numberPageNumber: number = (this.pageNumber as unknown) as number
////////////////////////////////

  paramsSubscription: Subscription;
  pageSize: string

  @Input() set getPageSize(page) {
    console.log(page)
  }

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private firebaseAuth: FirebaseAuthService,
    private store: Store<fromApp.AppState>
    ){
      if(typeof this.vUnknown == 'string') {
        let s2: string = this.vUnknown
      }
    }

  ngAfterViewInit() {
    this.panes.changes.subscribe((r) => {
      // console.log(r)
    });
  }

  ngOnInit() {
    // this.route.snapshot.params['id'];
    // this.route.snapshot.queryParams.subscribe();
    // this.route.snapshot.fragment.subscribe();
    // this.paramsSubscription = this.route.params
    // .subscribe((params)=>{})
    this.userSub = this.store.select('auth').pipe(
      map(
        (authState) => authState.user
      )
      )
      .subscribe(
      user => {
        console.log("response called")
        this.isAuthenticated = !!user
      }
    )
  }

  // relative path being "users" and absolute path being "/users"
  navigate() {
    // this.router.navigate(["recipe"]);
    // this.router.navigate(["recipe"], {relativeTo: this.route});
    // this will retain the queryparameters
    // this.router.navigate(["recipe"], {relativeTo: this.route, queryParamsHandling: 'preserve'});
    // this.router.navigate(["recipe", 5, "edit"], {queryParams: {allowEdit: '1'}, fragment: "loading"});
  }

  onLogin() {
    this.authService.login()
  }

  onLogout() {
    this.firebaseAuth.logout()
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }


}
