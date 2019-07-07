import { Component, OnInit, OnChanges } from '@angular/core';
import ApiService from '../api.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  newAlert_title: string = '';
  newAlert_url: string = '';
  newAlert_image: string = '';

  data: any = {
    left: {},
    center: {},
    right: {},
    archive: {},
    alert: {}
  };

  counts: any = {
    alert: null,
    left: null,
    center: null,
    right: null,
    archive: null,
    total: 0
  }

  status: any = {
    new: 0,
    oneMonth: 0,
    threeMonth: 0,
    sixMonth: 0
  }

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.fetchAllColumns();
  }

  ngOnChanges(){
    this.fetchAllColumns();
  }

  fetchAllColumns(){
    this.fetchColumn('left');
    this.fetchColumn('center');
    this.fetchColumn('right');
    this.fetchColumn('alert');
    this.fetchColumn('archive');
  }

  calculateTotal(){
    let total:number = 0;
    for(let i in this.counts){
      if(this.counts[i] !== null) total += this.counts[i]
    }
    return total;
  }

  private fetchColumn(title: string){
    const token: string = window.sessionStorage.getItem('token');

    this.apiService.column_fetchByTitle(title, token)
    .subscribe((resp:any) => {
      this.data[title] = resp
      this.counts[title] = resp.articles.length;
      this.counts.total += resp.articles.length;

      resp.articles.forEach(({status}) => this.handleStatusCheck(status))
    });
  }

  handleStatusCheck(status:number){
    if(status === 0) this.status.new += 1;
    else if(status === 1) this.status.oneMonth += 1;
    else if(status === 2) this.status.threeMonth += 1;
    else if(status === 3) this.status.sixMonth += 1;
  }

  clearInputs(){
    this.newAlert_title = '';
    this.newAlert_url = '';
  }

  submitNewAlertArticle(){

    var body: any = {};

    const title = this.newAlert_title.trim();
    const url = this.newAlert_url.trim();
    const image = this.newAlert_image.trim();

    if( this.data.hasOwnProperty('alert') ){
      const alertColumnId: string = this.data.alert.columnData._id;
      body.column = alertColumnId;
    }
    else return;

    if( title === '' || url === '' ) return console.log('need title or url');
    body.title = title;
    body.url = url;

    if( image !== '' ) body.image = image;

    body.position = 1;

    this.postNewAlert(body);

    // this.fetchColumn('alert');
    this.newAlert_title = '';
    this.newAlert_url = '';
    this.newAlert_image = '';

  };

  private postNewAlert(body: any){
    const token: string = window.sessionStorage.getItem('token');

    this.apiService.article_post_create(body, token)
    .subscribe( (resp: any) => {
      this.fetchColumn('alert');
    });
  }

}
