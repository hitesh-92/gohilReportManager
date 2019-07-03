import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  username: string = sessionStorage.getItem('email').split('@')[0];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private http: HttpClient) {}

  onHandleLogout(){

    const url: string = 'http://localhost:8000/user/logout';
    const token: string = sessionStorage.getItem('token');
    const body: any = { token: token };
    const headers: any = new HttpHeaders({ 'x-auth': token });

    console.log('Add Logout functionality. main-nav.ts ==> ', body);

    // this.http.post(url, body, { headers })
  }

}
