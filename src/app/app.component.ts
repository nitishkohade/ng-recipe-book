import { ApplicationRef, ChangeDetectionStrategy, Component, Inject, NgZone, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { FirebaseAuthService } from './services/firebaseAuth.service';
import { LoggingService } from './logging.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  loadedFeature: string;

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)) {
      this.authService.autoLogin()
    } 
    this.loggingService.printLog("hello from app component ngOninit")
  }
  
  constructor(private app: ApplicationRef, 
    private zone: NgZone, 
    private authService: FirebaseAuthService,
    private loggingService: LoggingService,
    @Inject(PLATFORM_ID) private platformId) {
    // console.log(app)
    this.loadedFeature = "recipe"
    // console.log(zone)
    zone.runOutsideAngular(()=>{
      setTimeout(()=>{
         // this won't be reflected in the component view
        //  this.property = 5;

         // but if you run detection manually you will see the changes
        //  app.tick();
      })
   })
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
