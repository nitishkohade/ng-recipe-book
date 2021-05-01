import { HttpClient } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import * as AuthActions from "../store/auth.actions";
import { environment } from "../../../environments/environment";
import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    kind: string;
    registered?: boolean;
}

@Injectable()
export class AuthEffects {

    // @Effect()
    // authSignup = this.actions$.pipe(
    //     ofType(AuthActions.SIGNUP_START),
    //     switchMap((signupAction => AuthActions.SignupStart) => {

    //     })
    // )

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap(
            (authData: AuthActions.LoginStart) => {
                console.log("eefect1")
                const {email, password} = authData.payload
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`
                return this.http.post<AuthResponseData>(url, {
                    email, 
                    password, 
                    returnSecureToken: true
                }).pipe(
                    map(
                        resData => {
                            const {email, localId, idToken, expiresIn} = resData
                            const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000)
                            return new AuthActions.AuthenticateSuccess({
                                email, userId: localId, token: idToken, expirationDate
                            })
                        }
                    ),
                    catchError(
                        errorRes => {
                            let message = "An Error Occurred!";
                            if(!errorRes.error || !errorRes.error.error){
                                return of(new AuthActions.AuthenticateFail(message))
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
                            return of(new AuthActions.AuthenticateFail(message))
                        })
                )
            })
    )

    @Effect({dispatch: false})
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap(
            () => {
                console.log("eefect2")

                this.router.navigate(['/'])
            }
        )
    )

    constructor(private actions$: Actions,
        private http: HttpClient,
        private router: Router){}
}