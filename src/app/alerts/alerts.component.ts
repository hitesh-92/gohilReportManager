import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

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
      'http://localhost:8000/column/alert',
      {
        headers: new HttpHeaders({
          'x-auth': window.sessionStorage.getItem('token')
        })
      }
    )
    .subscribe( (resp: any) => {
      // console.log('/alert succes ==> ', resp)

      if (resp.error) return console.error('left-column, ERROR, fetchColumn()');

      this.articles = [...resp.articles];
      this.columnTitle = resp.columnData.title;
      this.columnId = resp.columnData._id;
    });

  }

}
