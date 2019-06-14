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

    console.log('Log In Opened');

    const dialogRef = this.dialog.open(UserLoginForm, {
      data: {name: this.name, password: this.password}
    });

    dialogRef.afterClosed()
    .subscribe(({
      name, password
    } = {}) => {

      this.name = name;
      this.password = password;
      console.log(`name:${name}, password:${password}`);

      const userData: { email: string, password: string } = {
        email: this.name.trim(),
        password: this.password.trim()
      }

      this.http.post(this.loginuUrl, userData)
      .subscribe(res => {

        const {email, loggedIn, token} = res;

        if(!loggedIn) return;

        window.sessionStorage.setItem('email', email);
        window.sessionStorage.setItem('token', token);
        this.router.navigate(['/app/home']);
      })
    });

  };

  ngOnInit() {
  }

}

///////

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
