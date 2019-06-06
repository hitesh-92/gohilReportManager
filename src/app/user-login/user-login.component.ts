import {
  Component,
  OnInit,
  Inject
} from '@angular/core';

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

  constructor(public dialog: MatDialog, private router: Router) {}

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

      // login in request

      if( this.name && this.password ){

        (async(email, password) => {

          const url: string = 'http://localhost:8000/user/login';
          const ops: object = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email, password
            })
          };

          await fetch(url, ops)
          .then(r => r.json())
          .then(res => {

            // console.log(`email:${email}, loggedIn:${loggedIn}, token:${token}`);
            const {token, email, loggedIn} = res;

            if(loggedIn){
              window.sessionStorage.setItem('token', token);
              window.sessionStorage.setItem('email', email);
              this.router.navigate(['/dashboard']);
            } else {
              console.log('errrrr logging in');
              this.password = '';
            }


          })


        })(this.name, this.password);


      }





    })

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
