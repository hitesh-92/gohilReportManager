import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  articles: any = [
    {title: "Beijing pioneering citizens' 'points' system critics brand 'Orwellian'"},
    {title: "Almost Half of U.S. Births Happen Outside Marriage, Signaling Cultural Shift"}
  ]

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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchAllColumns();
    // console.log(this.data)
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
    const url: string = `http://localhost:8000/column/${title}`;
    const headers: any = new HttpHeaders({ 'x-auth': window.sessionStorage.getItem('token') });

    return this.http
    .get(url, { headers })
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
    const url: string = 'http://localhost:8000/article/';
    const headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth': token
    });

    this.http.post(url, body, { headers })
    .subscribe( (resp: any) => {
      console.log('New Alert Success ==> ', resp);
      this.fetchColumn('alert');
    });
  }

}
