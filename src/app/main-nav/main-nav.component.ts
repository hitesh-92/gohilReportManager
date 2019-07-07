import { Component } from '@angular/core';
import { Router } from '@angular/router';
import ApiService from '../api.service';

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

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private apiService: ApiService
  ) {}

  onHandleLogout(){

    const token: string = sessionStorage.getItem('token');
    const body: any = {
      email: window.sessionStorage.getItem('email')
     };

    this.apiService.user_logout(body, token)
    .subscribe( (resp: any) => {
      window.sessionStorage.clear();
      this.router.navigate(['/']);
    });

  }

}
