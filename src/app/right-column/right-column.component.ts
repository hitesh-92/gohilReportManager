import { Component, OnInit, OnChanges } from '@angular/core';
import ApiService from '../api.service';

@Component({
  selector: 'app-right-column',
  templateUrl: './right-column.component.html',
  styleUrls: ['./right-column.component.css']
})
export class RightColumnComponent implements OnInit {

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
    const title: string = 'right';
    const token: string = window.sessionStorage.getItem('token');

    this.apiService.column_fetchByTitle(title, token)
    .subscribe( (resp: any) => {
      if( resp.error ) return this.handleFetchColumnError(resp);
      else this.handleFetchedColumnData(resp);
    });
  }

  handleFetchColumnError(resp: any){
    console.log('Error. Column: Right ==> ', resp);
  }

  handleFetchedColumnData(resp: any){
    this.articles = [...resp.articles];
    this.columnTitle = resp.columnData.title;
    this.columnId = resp.columnData._id;
  }

}
