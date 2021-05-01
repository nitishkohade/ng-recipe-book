import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "../common/user.model";
import { environment } from "../../environments/environment"
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as fromAuth from "../auth/store/auth.actions";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    kind: string;
    registered?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

    // user = new BehaviorSubject<User>(null)

    tokenExpirationTimer: any;

    constructor(private http: HttpClient, 
        private router: Router,
        private store: Store<fromApp.AppState>) {}

    logout() {
        // this.user.next(null)
        this.store.dispatch(new fromAuth.Logout())
        this.router.navigate(["/auth"])
        localStorage.removeItem('userData')
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout()
        }, expirationDuration);
    }

    signup(email: string, password: string) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`
        return this.http.post<AuthResponseData>(url, {
            email, password, returnSecureToken: true
        }).pipe(catchError(this.handleErrorResponse), tap(this.handleAuthentication.bind(this)))
    }

    autoLogin() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if(!userData) {
            return
        }
        const user = new User(userData.email, userData.id, userData._token, userData._tokenExpirationDate)
        if(user.token) {
            this.store.dispatch(new fromAuth.AuthenticateSuccess({email: user.email, 
                userId: user.id, 
                token: user.token, 
                expirationDate: new Date(userData._tokenExpirationDate)}))
        //    this.user.next(user) 
           this.autoLogout(new Date(userData._tokenExpirationDate).getTime() - new Date().getTime() )
        }
    }

    login(email: string, password: string) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`
        return this.http.post<AuthResponseData>(url, {
            email, password, returnSecureToken: true
        }).pipe(catchError(this.handleErrorResponse), tap(this.handleAuthentication.bind(this)))
    }

    private handleAuthentication(resData) {
        const {email, localId, idToken, expiresIn} = resData
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, localId, idToken, expirationDate)
        localStorage.setItem('userData', JSON.stringify(user))
        this.autoLogout(+expiresIn * 1000)
        // this.user.next(user)
        if(user.token) {
            this.store.dispatch(new fromAuth.AuthenticateSuccess({email: user.email, 
                userId: user.id, 
                token: user.token, 
                expirationDate: expirationDate}))
            }
    }

    private handleErrorResponse(errorRes: HttpErrorResponse) {
        let message = "An Error Occurred!";
                if(!errorRes.error || !errorRes.error.error){
                    return throwError(message)
                }
                switch(errorRes.error.error.message) {
                    case "EMAIL_EXISTS":
                        message = "This email exists already"
                        break;
                    case "EMAIL_NOT_FOUND":
                        message = "This email does not exist"
                        break;
                    case "INVALID_PASSWORD":
                        message = "The entered password is invalid!"
                }
                return throwError(message)
    }

}
