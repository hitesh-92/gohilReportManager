import { Component, OnInit, OnChanges } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-center-column',
  templateUrl: './center-column.component.html',
  styleUrls: ['./center-column.component.css']
})
export class CenterColumnComponent implements OnInit {

  columnTitle: string = ''
  columnId: string = ''
  articles: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchColumn()
  }

  ngOnChanges(){
    this.fetchColumn()
  }

  fetchColumn(){
    this.http
    .get(
      'http://localhost:8000/column/center',
      {
        headers: new HttpHeaders({
          'auth': window.sessionStorage.getItem('token')
        })
      }
    )
    .subscribe( (resp: any) => {
      // console.log('/center succes ==> ', resp)

      if (resp.error) return console.error('center-column, ERROR, fetchColumn()');

      this.articles = [...resp.articles];
      this.columnTitle = resp.columnData.title;
      this.columnId = resp.columnData._id;
    });

  }

}
