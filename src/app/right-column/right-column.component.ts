import { Component, OnInit, OnChanges } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-right-column',
  templateUrl: './right-column.component.html',
  styleUrls: ['./right-column.component.css']
})
export class RightColumnComponent implements OnInit {

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
      'http://localhost:8000/column/right',
      {
        headers: new HttpHeaders({
          'x-auth': window.sessionStorage.getItem('token')
        })
      }
    )
    .subscribe( (resp: any) => {
      // console.log('/right succes ==> ', resp)

      if (resp.error) return console.error('left-column, ERROR, fetchColumn()');

      this.articles = [...resp.articles];
      this.columnTitle = resp.columnData.title;
      this.columnId = resp.columnData._id;
    });

  }

}
