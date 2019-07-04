import {
  Component,
  OnInit,
  Inject
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Router } from '@angular/router';

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

  constructor(public dialog: MatDialog, private router: Router, private http: HttpClient) {}

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
    this.http
    .post<{loggedIn: boolean, email: string, token: string}>('http://localhost:8000/user/login', body)
    .subscribe(resp => {

      if(!resp.loggedIn){
        // Handle log in error

        this.name = '';
        this.password = '';
        return;
      }

      //Log in success
      window.sessionStorage.setItem('token', resp.token);
      window.sessionStorage.setItem('email', resp.email);
      this.router.navigate(['/app/overview']);
    })
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
