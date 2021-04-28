import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

type Server = {id: number, name: string, status: boolean}

@Injectable({
  providedIn: 'root'
})
export class ServerResolverService implements Resolve<Server>{

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server{
    return {id: 4, name: "Nitish", status: true}
  }
}
