import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    const token: any = sessionStorage.getItem('token');
    if ( token === null ) return;

    this.attemptSignIn(token);
  }

  private attemptSignIn(token: string){

    const url: string = 'http://localhost:8000/user/login';
    const body: {} = {};
    const headers = new HttpHeaders({'x-auth': token});

    this.http.post(url, body, { headers })
    .subscribe( (resp: any) => {

      if( resp.loggedIn === true ){
        this.setToken(resp.token);
        this.router.navigate(['/app/overview']);
      }
    });

  }

  setToken(token: string){
    window.sessionStorage.setItem('token', token);
  }

}
