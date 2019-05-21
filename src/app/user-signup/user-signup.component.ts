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
  animal: string;
  name: string;
}

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {

    name: string = '';
    password: string;

    constructor(public dialog: MatDialog) {}

    openDialog(): void {
      console.log('OPNEDDD')
      const dialogRef = this.dialog.open(UserSignUpForm, {
        width: '25wv',
        height: '40vh',
        data: {name: this.name, password: this.password}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.password = result;
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
  // styleUrls: 'userSignUpForm.css'
})
export class UserSignUpForm {

  constructor(
    public dialogRef: MatDialogRef<UserSignUpForm>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
