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
    return;
  }

}
