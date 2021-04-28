import { EventEmitter, Injectable } from '@angular/core';
// only if it is injecting services to its construcctor
// {providedIn: 'root'} this way you don't need to add this is the app module providers
// by using the above way services will be loaded lazily which will result in better performance and loading speed
@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  // now one component can emit and the other can read
  statusChanged = new EventEmitter();

  logStatusChange(status: string) {
    console.log(status)
  }
}
