import {
  Component,
  OnInit,
  Inject
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

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
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {

    name: string = '';
    password: string = '';

    constructor(public dialog: MatDialog, private http: HttpClient) {}

    openDialog(): void {

      const dialogRef = this.dialog.open(UserSignUpForm, {
        data: {name: this.name, password: this.password}
      });

      dialogRef.afterClosed()
      .subscribe(({
        name, password
      } = {}) => {

        this.password = password;
        this.name = name;

        const userData: {email: string, password: string} = {
          email: this.name.trim(),
          password: this.password.trim()
        }

        this.onSignUp(userData);

      });
    };

    ngOnInit(){
    }

    private onSignUp(body: {email: string, password: string}){
      this.http
      .post('http://localhost:8000/user/signup', body)
      .subscribe(resp => {
        console.log('signup/ ==> ', resp);
      })

    }

}

// -----

@Component({
  selector: 'user-signup-form',
  templateUrl: 'userSignUpForm.html',
})
export class UserSignUpForm {

  constructor(
    public dialogRef: MatDialogRef<UserSignUpForm>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(e): void {
    this.dialogRef.close();
  }

}
