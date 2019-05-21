import {
  Component,
  OnInit,
  Inject
} from '@angular/core';

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

    constructor(public dialog: MatDialog) {}

    openDialog(): void {
      console.log('OPNEDDD')
      const dialogRef = this.dialog.open(UserSignUpForm, {
        data: {name: this.name, password: this.password}
      });

      dialogRef.afterClosed()
      .subscribe(({
        name, password
      } = {}) => {
        console.log('The dialog was closed');
        this.password = password;
        this.name = name;
        console.log(`email:${this.name}, passowrd: ${this.password}`);

        //validate properly
        if ( this.name != undefined && this.password != undefined ){

          //MAKE REQUEST TO SINGUP HERE
          (async (email, password) => {
            // const url = 'https://jsonplaceholder.typicode.com/users'
            // const saved = await fetch(url).then(r => r.json())
            // console.log(saved[0])

            const url = 'http://localhost:8000/user/signup'
            const ops = {
              method: 'POST',
              mode: 'cors',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email, password
              })
            }
            const saved = await fetch(url, ops).then(res => res.json())

            console.log(saved)

          })(this.name, this.password);


        } else {
          console.log('need in put')
        }




      });

    }

}


  // ngOnInit() {
  // }

// }

///////


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
