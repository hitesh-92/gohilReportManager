import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isActive = false;
  wasClicked = false;
  someInput = '';
  twoWay = '';

  constructor() {
    setTimeout(() => {
      this.isActive = true;
    }, 2000);
  }

  ngOnInit() {
  }

  onSelectThing() {
    this.wasClicked = !this.wasClicked;
    console.log('button was clickeeddd')
  }

  inputSomething({target: {value}}) {
    console.log(value);
    this.someInput = value;
    // console.log(this.someInput);
  }

}
