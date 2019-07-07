import { Component, OnInit } from '@angular/core';
import ApiService from '../api.service';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  columnTitle: string = ''
  columnId: string = ''
  articles: any = [];

  // constructor(private http: HttpClient) { }
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.fetchColumn()
  }

  ngOnChanges(){
    this.fetchColumn()
  }

  fetchColumn(){
    const title: string = 'alert';
    const token: string = window.sessionStorage.getItem('token');

    this.apiService.column_fetchByTitle(title, token)
    .subscribe( (resp: any) => {
      if( resp.error ) return this.handleFetchColumnError(resp);
      else this.handleFetchedColumnData(resp);
    });
  }

  handleFetchColumnError(resp: any){
    console.log('Error. Column: Alert ==> ', resp);
  }

  handleFetchedColumnData(resp: any){
    this.articles = [...resp.articles];
    this.columnTitle = resp.columnData.title;
    this.columnId = resp.columnData._id;
  }

}
