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

  // onLogIn(){
  //   console.log('Hi')
  // }


  ngOnInit() {
  }

}
