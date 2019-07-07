import {
  Component,
  OnInit,
  Inject
} from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';

import ApiService from '../api.service';

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

    constructor(
      public dialog: MatDialog,
      private apiService: ApiService
    ) {}

    openDialog(): void {

      const dialogRef = this.dialog.open(UserSignUpForm, {
        data: {name: this.name, password: this.password}
      });

      dialogRef.afterClosed()
      .subscribe(({
        name, password
      } = {}) => {

        password = password.trim();
        name = name.trim();

        if( name==='' || password==='' ) return console.log('Validate Name/Password');
        if( password.length < 8 ) return console.log('Validate Password - 8 chars min');

        const userData: {email: string, password: string} = {
          email: name,
          password: password
        }

        this.onSignUp(userData);

      });
    };

    ngOnInit(){
    }

    private onSignUp(body: {email: string, password: string}){
      this.apiService.user_signup(body)
      .subscribe( (resp: any) => {
        console.log('signed up ==> ', resp);
      });

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
