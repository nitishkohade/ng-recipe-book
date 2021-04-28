import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  errorMessage: string;
  server: {id: number, name: string, status: string}
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.errorMessage = this.route.snapshot.data['message']
    // this.route.data.subscribe(
    //   (data: Data) => {
    //     console.log(data)
    //     this.errorMessage = data['message']
    //   }
    // )
     this.route.data.subscribe(
      (data: Data) => {
        console.log(data)
        this.server = data['server']
      }
    )
  }

}
