import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./interceptors/auth-interceptor.service";
import { LoggingService } from "./logging.service";
import { CanDeactivateGuardService } from "./services/can-deactivate-guard.service";

@NgModule({
    providers: [
        CanDeactivateGuardService, 
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ]
})
export class CoreModule {

}