import { Component, OnInit, OnChanges } from '@angular/core';

// import { HttpClient, HttpHeaders } from '@angular/common/http';
import ApiService from '../api.service';

@Component({
  selector: 'app-center-column',
  templateUrl: './center-column.component.html',
  styleUrls: ['./center-column.component.css']
})
export class CenterColumnComponent implements OnInit {

  columnTitle: string = ''
  columnId: string = ''
  articles: any = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.fetchColumn()
  }

  ngOnChanges(){
    this.fetchColumn()
  }

  fetchColumn(){
    const title: string = 'center';
    const token: string = window.sessionStorage.getItem('token');

    this.apiService.column_fetchByTitle(title, token)
    .subscribe( (resp: any) => {
      if( resp.error ) return this.handleFetchColumnError(resp);
      else this.handleFetchedColumnData(resp);
    });
  }

  handleFetchedColumnData(data: any){
    this.articles = [...resp.articles];
    this.columnTitle = resp.columnData.title;
    this.columnId = resp.columnData._id;
  }

  handleFetchColumnError(data: any){
    console.error('center-column, ERROR, fetchColumn()');
  }

}
