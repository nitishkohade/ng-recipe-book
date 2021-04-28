import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot,
  CanActivate, 
  CanActivateChild, 
  Router, 
  RouterStateSnapshot, 
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { FirebaseAuthService } from './firebaseAuth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, 
    private router: Router,
    private auth: FirebaseAuthService) { }

  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{

      // return this.authService.isAuthenticated()
      // .then(
      //   (authenticated: boolean) => {
      //     if(authenticated) {
      //       return true;
      //     } else {
      //       this.router.navigate(['/'])
      //     }
      //   }
      // )
  
      return this.auth.user.pipe(take(1), map(
        res => {
          const isAuth = !!res

          if(isAuth) {
            return true
          }
          return this.router.createUrlTree(['/auth'])
        }
      ), 
      // tap(isAuth => {
      //   if(!isAuth) {
      //     this.router.navigate(['/auth'])
      //   }
      // }
      )
    }

  // canActivateChild(route: ActivatedRouteSnapshot, 
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //     return this.canActivate(route, state)
  //   }
}
