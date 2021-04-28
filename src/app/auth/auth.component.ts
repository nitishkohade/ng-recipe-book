import { Component, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../common/alert/alert.component";
import { PlaceholderDirective } from "../common/placeholder.directive";
import { FirebaseAuthService, AuthResponseData } from '../services/firebaseAuth.service';

@Component({
    selector: "app-auth",
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {

    isLoginMode = false;
    isLoading = false;
    error: string = null;

    closeSubscription: Subscription

    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective

    constructor(private auth: FirebaseAuthService, 
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode
    }

    OnSubmit(form: NgForm){
        if(form.invalid) {
            return
        }

        let authObs: Observable<AuthResponseData>

        this.isLoading = true
        const email = form.value.email
        const password = form.value.password

        if(this.isLoginMode) {
            authObs = this.auth.login(email, password)
        } else {
            authObs = this.auth.signup(email, password)
        }

        authObs.subscribe(
            res => {
                this.isLoading = false
                this.error = null
                this.router.navigate(['/recipes'])
            },
            errorMes => {                       
                this.error = errorMes
                this.showErrorAlert(errorMes)
                this.isLoading = false
            }
        )
         form.reset(); 
    }

    private showErrorAlert(errorMes: string) {
        // const alertCom = new AlertComponent()
        const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
        const hostViewContainerRef = this.alertHost.viewContRef
        hostViewContainerRef.clear()
        const componentRef = hostViewContainerRef.createComponent(alertCompFactory)

        componentRef.instance.message = errorMes
        this.closeSubscription = componentRef.instance.close.subscribe(res => {
            this.closeSubscription.unsubscribe()
            hostViewContainerRef.clear()
        })
    }

    ngOnDestroy() {
        if(this.closeSubscription) {
            this.closeSubscription.unsubscribe()
        }
    }

}