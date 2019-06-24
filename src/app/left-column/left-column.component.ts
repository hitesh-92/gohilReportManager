import { Component, OnInit, OnChanges } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-left-column',
  templateUrl: './left-column.component.html',
  styleUrls: ['./left-column.component.css']
})
export class LeftColumnComponent implements OnInit {

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

    const url: string = 'http://localhost:8000/column/left';
    const headers: any = new HttpHeaders({ 'x-auth': window.sessionStorage.getItem('token') });

    this.http
    .get( url, { headers } )
    .subscribe( (resp: any) => {
      // console.log('/left succes ==> ', resp)

      if (resp.error) return console.error('left-column, ERROR, fetchColumn()');

      this.articles = [...resp.articles];
      this.columnTitle = resp.columnData.title;
      this.columnId = resp.columnData._id;
    });

  }

}
