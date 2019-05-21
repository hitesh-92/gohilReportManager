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

  animal: string;
    name: string = 'Panda';

    constructor(public dialog: MatDialog) {}

    openDialog(): void {
      console.log('OPNEDDD')
      const dialogRef = this.dialog.open(UserSignUpForm, {
        width: '250px',
        height: '500px',
        data: {name: this.name, animal: this.animal}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
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
  styleUrls: 'userSignUpForm.css'
})
export class UserSignUpForm {

  constructor(
    public dialogRef: MatDialogRef<UserSignUpForm>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
