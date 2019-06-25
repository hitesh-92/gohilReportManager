import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-column-view',
  templateUrl: './column-view.component.html',
  styleUrls: ['./column-view.component.css']
})
export class ColumnViewComponent implements OnInit {

  @Input() columnTitle: string;
  @Input() columnId: string;
  @Input() articles: any;

  totalArticles: number = 0;
  switch_selected: any = null;
  switch_moveTo: any =null;

  allowSwitch: boolean = false;

  //stores index of article in articles array
  selected: number = -1;
  moveTo: number = -1;
  edit: boolean = true;
  requestType: any = '';

  //table
  displayedColumns: string[] = ['position', 'title', 'url', 'image', '_id'];
  dataSource;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private http: HttpClient, private location: Location, private router: Router) { }

  ngOnInit() {

  }

  ngOnChanges(){
    if(this.articles.length > 0) this.totalArticles = this.articles.length;

    if(this.switch_selected !== null && this.switch_moveTo !== null) this.allowSwitch = true;
    else this.allowSwitch = false;

    this.dataSource = new MatTableDataSource(this.articles);
  }


  /*
  *   Buttons
  */

  onEdit(position: any){
    if(this.edit === true) this.forwardToEditPage(position);
    else this.handleSwitchSelects(position, true);
  }

  onSwitch(position: number){
    this.handleSwitchSelects(position, false);
  }

  onConfirmSwitch(event:any){
    // console.log(`TYPE:${this.requestType}, selected:${this.selected}, moveTo:${this.moveTo}`);

    const body: any = {
      selected: this.articles[this.selected - 1]._id,
      moveTo: this.articles[this.moveTo - 1]._id
    };

    if( this.requestType === 'switch' ) this.handleSwitchRequest(body);
    else if ( this.requestType === 'insert' ) this.handleInsertRequest(body);
  }

  /*
  *   Navigation
  */

  forwardToEditPage(position: number){
    const current: string = location.pathname;
    const articleId: string = this.articles[position - 1]._id;
    const navigateTo: string = `${current}/editor/${articleId}`;
    this.router.navigate([navigateTo]);
  }

  onAddNewArticle(){
    let current: string = location.pathname;
    let navigateTo: string = `${current}/editor/new`;
    this.router.navigate([navigateTo]);
  }

  /*
  *   HTTP
  */

  private handleSwitchRequest(body: any){
    const url: string = 'http://localhost:8000/article/switch';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth': window.sessionStorage.getItem('token')
    });

    this.http.patch(url, body, { headers })
    .subscribe( (resp:any) => {
      console.log('Switch Success ==> ', resp);
      this.resetColumnArticles();
    });
  }

  private handleInsertRequest(body: any){
    const url: string = 'http://localhost:8000/article/insert';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth': window.sessionStorage.getItem('token')
    });

    this.http.patch(url, body, { headers })
    .subscribe( (resp:any) => {
      console.log('Insert Success ==> ', resp);
      this.resetColumnArticles();
    });
  }

  private resetColumnArticles(){
    const url: string = `http://localhost:8000/column/${this.columnTitle}`;
    const headers = new HttpHeaders({ 'x-auth': window.sessionStorage.getItem('token') });

    this.http.get(url, { headers })
    .subscribe( (resp: any) => {
      this.articles = [...resp.articles];
      // ADD IN LOADING
      this.selected = -1;
      this.moveTo = -1;
      this.dataSource = new MatTableDataSource(this.articles);
    });
  }

  /*
  *   Logic
  */

  switchPositionDisplay(title:string){

    if(title === 'selected'){
      return this.selected === -1
      ? '0'
      : `${this.selected}`
    } else {
      return this.moveTo === -1
      ? '0'
      : `${this.moveTo}`
    }

  }

  updateSwitchIcons(){
    this.selected === -1 && this.moveTo === -1
    ? this.edit = true
    : this.edit = false
  }

  handleSwitchSelects(position: number, toInsert: boolean){

    if( toInsert === false ){
      // handleInitialSelect then handleSwitchArticles

      const selectedInitialAgain: boolean = this.selected === position;
      const newSelect: boolean = this.selected === -1;

      if( selectedInitialAgain ) this.selected = -1;
      else if( newSelect ) this.selected = position;
      else{
        //handleSwitchArticles

        // const sameAsSelected: boolean = this.selected === position;
        const selectedMoveToAgain: boolean = this.moveTo === position;
        const newMoveTo: boolean = this.moveTo === -1;

        // if ( sameAsSelected ) {return console.log('picked again switch')}
        if( selectedMoveToAgain ) {
          this.moveTo = -1;
          this.requestType = '';
        }
        else if ( newMoveTo ) {
          this.moveTo = position;
          this.requestType = 'switch';
        }
        else console.log('ERROR - handleSwitchSelects -> handleSwitchArticles');

      }

    } else {
      //handleInsertArticle

      const sameAsSelected: boolean = this.selected === position;
      const selectedInsertAgain =  this.moveTo === position;
      const newInsert = this.moveTo === -1;

      if ( sameAsSelected ) {return console.log('picked again insert')}
      else if( selectedInsertAgain ) {
        this.moveTo = -1;
        this.requestType = '';
      }
      else if( newInsert ) {
        this.moveTo = position;
        this.requestType = 'insert';
      }
      else console.log('ERROR - handleSwitchSelects -> handleInsertArticle');

    }

    // console.log(`TYPE:${this.requestType}, selected:${this.selected}, moveTo:${this.moveTo}`);

    this.handleAllowConfirm();
    this.updateSwitchIcons();
  }

  handleAllowConfirm(){
    if(this.selected !== -1 && this.moveTo !== -1) this.allowSwitch = true;
    else this.allowSwitch = false;
  }

  leftButtonRender(){
    return this.edit ? 'edit' :'keyboard_backspace';
  }

  rightButtonRender(position: any){
    if( this.selected === position ) return 'clear';
    else if( this.edit ) return 'swap_vertical_circle';
    else return 'swap_vert';
  }

}
