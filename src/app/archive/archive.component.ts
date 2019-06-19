import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

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
      'http://localhost:8000/column/archive',
      {
        headers: new HttpHeaders({
          'auth': window.sessionStorage.getItem('token')
        })
      }
    )
    .subscribe( (resp: any) => {
      // console.log('/archive succes ==> ', resp)

      if (resp.error) return console.error('left-column, ERROR, fetchColumn()');

      this.articles = [...resp.articles];
      this.columnTitle = resp.columnData.title;
      this.columnId = resp.columnData._id;
    });

  }

}
