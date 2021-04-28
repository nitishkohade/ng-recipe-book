import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { FirebaseAuthService } from "../services/firebaseAuth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    
    constructor(private firebaseAuth: FirebaseAuthService){}

    // Angular will subscribe this automatically
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.firebaseAuth.user.pipe(
            take(1),
            exhaustMap(
                (user) => {
                    if(!user) {
                        return next.handle(req)
                    }
                    const customReq = req.clone({
                        params: new HttpParams().set('auth', user.token)
                    })
                    return next.handle(customReq)
                }
            )
        )
    }

}