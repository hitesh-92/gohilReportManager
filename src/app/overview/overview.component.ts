import { Component, OnInit } from '@angular/core';
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

  data: object = {
    left: {},
    center: {},
    right: {},
    archive: {},
    alert: {}
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchColumn('left');
    this.fetchColumn('center');
    this.fetchColumn('right');
    this.fetchColumn('alert');
    this.fetchColumn('archive');
    console.log(this.data)
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
    const body: { title: string, url:string, position: number, column: string } = {
      title: this.newAlert_title.trim(),
      url: this.newAlert_url.trim(),
      position: 1,
      column: this.data.alert.columnData._id
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
    .subscribe(resp => {
      console.log('success ==> ', resp)

      if(!resp.articleSaved) return;
      this.fetchColumn('alert');
      console.log(this.data.alert.articles)
    })

    return;
  }

}
