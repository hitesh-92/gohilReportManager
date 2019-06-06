import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    fetch('http://localhost:8000/column/')
    .then(r => r.json())
    .then(res => {
      this.data = res;
    })
    .catch(err => console.log('ERrr', err))
  }

  clearInputs(){
    this.newAlert_title = '';
    this.newAlert_url = '';
  }

  submitArticle(){
    const payload: object = {
      title: this.newAlert_title,
      url: this.newAlert_url,
      column: '5ce71f57977b8a05d41aedaf'
    }

    const endpoint: string = 'http://localhost:8000/article/alert'
    //ObjectId("5ce71f57977b8a05d41aedaf")


    fetch(endpoint, {
      method: 'get',
      headers: {'x-auth': window.sessionStorage.getItem('token')},
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => console.log('WORKING', data))
    .catch(err => console.log('FAILED', err))

  }

}
