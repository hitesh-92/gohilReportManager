import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ApiService from '../api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const token: any = sessionStorage.getItem('token');
    if ( token === null ) return;

    this.attemptSignIn(token);
  }

  private attemptSignIn(token: string){
    this.apiService.user_logInWithToken(token)
    .subscribe( (resp: any) => {
      if( resp.loggedIn ) this.handleTokenLogInSuccess(resp.token);
    });
  }

  setToken(token: string){
    window.sessionStorage.setItem('token', token);
  }

  handleTokenLogInSuccess(token: string){
    this.setToken(token);
    this.router.navigate(['/app/overview']);
  }

}
