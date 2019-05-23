import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const token: any = checkForToken();
    // console.log(`dashboard token: ${token}`);
    // if no token redirect to '/'

    if(token){
      getAllData(token).then(res => console.log(res) )
    }

    // -----

    function checkForToken(){
      return window.sessionStorage.getItem('token');
    };

    async function getAllData(token){
      const url = 'http://localhost:8000/column/';
      const ops = {
        method: 'GET',
        mode: 'cors',
        headers: {'x-auth': token}
      }
      return await fetch(url, ops).then(r => r.json())
    };

  };



}
