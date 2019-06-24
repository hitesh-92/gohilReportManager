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
    let columnId = '';
    if( this.data.hasOwnProperty('alert') ) columnId = this.data.alert.columnData._id

    const body: { title: string, url:string, position: number, column: string } = {
      title: this.newAlert_title.trim(),
      url: this.newAlert_url.trim(),
      position: 1,
      column: columnId
    }
    const token: string = window.sessionStorage.getItem('token')

    this.http
    .post(
      'http://localhost:8000/article/',
      body,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-auth': window.sessionStorage.getItem('token')
        })
      }
    )
    .subscribe((resp:any) => {
      console.log('success ==> ', resp)

      if(!resp.articleSaved) return;
      this.fetchColumn('alert');
      // console.log(this.data.alert.articles);

      this.newAlert_title = '';
      this.newAlert_url = '';
    })

    return;
  }

}
