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

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const email:any = checkForEmail();

    if(email) console.log(`user-auth email: ${email}`);

    function checkForEmail(){
      let email = window.sessionStorage.getItem('email');
      return email
    };

  };

}
