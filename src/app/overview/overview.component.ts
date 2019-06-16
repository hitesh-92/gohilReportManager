import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  articles: object = [
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

  /*
  *
  *   Display with databinding
  *
  */

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchColumn('left');
    this.fetchColumn('center');
    this.fetchColumn('right');
    this.fetchColumn('alert');
    this.fetchColumn('archive');
    console.log(this.data)
  }

  ngOnChanges(){
    this.fetchColumn('left');
    this.fetchColumn('center');
    this.fetchColumn('right');
    this.fetchColumn('alert');
    this.fetchColumn('archive');
  }

  private fetchColumn(title: string){
    return this.http
    .get(`http://localhost:8000/column/${title}`)
    .subscribe(resp => this.data[title] = resp );
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
