import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../common/shared.module";
import { AuthGuardService } from "../services/auth-guard.service";
import { AuthenticateGuardService } from "../services/authenticate-guard.service";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations: [AuthComponent],
    imports: [CommonModule, 
        FormsModule, 
        SharedModule,
        RouterModule.forChild([
            {path: 'auth', component: AuthComponent, canActivate: [AuthenticateGuardService]}
        ])]
})
export class AuthModule {

}