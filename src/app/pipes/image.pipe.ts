import { HttpClient } from "@angular/common/http";
import { PipeTransform, Pipe } from "@angular/core";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";

// user it with async and this wont require subscribe
@Pipe({ name: "image" })
export class ImagePipe implements PipeTransform {
  defaultImage: string = "https://ih1.redbubble.net/image.465217072.5837/st,small,507x507-pad,600x600,f8f8f8.jpg";

  constructor(private http: HttpClient) {}

  transform(url: string): any {
      console.log(url)
    return this.http
      .get(url)
      .pipe(
        map(res => {
            console.log('res', res)
            return url;
        }),
        catchError(error => {
            if(!url) {
                return of('')
            }
            return of(this.defaultImage)
        })
      )
  }
}