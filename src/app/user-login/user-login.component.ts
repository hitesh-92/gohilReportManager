import {
  Component,
  OnInit,
  Inject
} from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import ApiService from '../api.service';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';

export interface DialogData {
  password: string;
  name: string;
}

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  name: string = 'test@email.com';
  password: string = 'password';
  loginuUrl: string = 'http://localhost:8000/user/login';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private apiService: ApiService
  ) {}

  openDialog(): void {

    const dialogRef = this.dialog.open(UserLoginForm, {
      data: {name: this.name, password: this.password}
    });

    dialogRef.afterClosed()
    .subscribe(({
      name, password
    } = {}) => {

      name = name.trim();
      password = password.trim();

      if( name==='' || password==='' ) return console.log('LogIn: Validate Nmae/Password');

      const userData: { email: string, password: string } = {
        email: name,
        password: password
      }

      this.onLogin(userData);

    });

  };

  ngOnInit() {
  }

  private onLogin(body: {email: string, password: string}){

    this.apiService.user_logIn(body)
    .subscribe( (resp: any) => {
      if( resp.loggedIn ) this.handleLogInSuccess(resp);
      else this.handleLogInError();
    });

  }

  handleLogInSuccess(data: any){
    window.sessionStorage.setItem('token', data.token);
    window.sessionStorage.setItem('email', data.email);
    this.router.navigate(['/app/overview']);
  }

  handleLogInError(){
    this.name = '';
    this.password = '';
  }

}

// -----

@Component({
  selector: 'user-login-form',
  templateUrl: 'userLoginForm.html',
})
export class UserLoginForm {

  constructor(
    public dialogRef: MatDialogRef<UserLoginForm>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(e): void {
    this.dialogRef.close();
  }

}
