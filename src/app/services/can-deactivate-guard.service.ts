import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';



export interface CanComponentDeactivate {

  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean
}

// it will be run whenever router will exit the current route given this guard is attached to the so called route
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate>{

  canDeactivate(component: CanComponentDeactivate, 
    currentRoute: ActivatedRouteSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return component.canDeactivate()
  }   
}
