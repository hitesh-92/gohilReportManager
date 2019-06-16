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
    const email:any = window.sessionStorage.getItem('email');
    const token:any = window.sessionStorage.getItem('token');

    // if(email) console.log(`user-auth email: ${email}`);
    // if(token) console.log(`user-auth token: true`);

    // if(token) //Allow to auto log-in if token has not expired
    // make sure to add in route to remove token on logout

    function checkForEmail(){
      let email = window.sessionStorage.getItem('email');
      return email
    };

  };

}
