import { Component, OnInit } from '@angular/core';
import ApiService from '../api.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

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
    const title: string = 'archive';
    const token: string = window.sessionStorage.getItem('token');

    this.apiService.column_fetchByTitle(title, token)
    .subscribe( (resp: any) => {
      if( resp.error ) this.handleFetchColumnError(resp);
      else this.handleFetchedColumnData(resp);
    });
  }

  handleFetchedColumnData(data: any){
    this.articles = [...data.articles];
    this.columnTitle = data.columnData.title;
    this.columnId = data.columnData._id;
  }

  handleFetchColumnError(data: any){
    console.log('Error. Column: Alert ==> ', data);
  }

}
