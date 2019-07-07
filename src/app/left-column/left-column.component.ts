import { Component, OnInit, OnChanges } from '@angular/core';

import ApiService from '../api.service';

@Component({
  selector: 'app-left-column',
  templateUrl: './left-column.component.html',
  styleUrls: ['./left-column.component.css']
})
export class LeftColumnComponent implements OnInit {

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
    const title: string = 'left';
    const token: string = window.sessionStorage.getItem('token');

    this.column_fetchByTitle(title)
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
