import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import ApiService from '../api.service';

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
  switch_moveTo: any = null;

  allowSwitch: boolean = false;

  selected: number = -1;
  moveTo: number = -1;
  edit: boolean = true;
  requestType: any = '';
  bothSelected: boolean = false;

  //table
  displayedColumns: string[] = ['position', 'title', 'url', 'image', '_id'];
  dataSource;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private apiService: ApiService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() { }

  ngOnChanges(){
    if(this.articles.length > 0) this.totalArticles = this.articles.length;

    if(this.switch_selected !== null && this.switch_moveTo !== null) this.allowSwitch = true;
    else this.allowSwitch = false;

    this.dataSource = new MatTableDataSource(this.articles);
  }


  /*
  *   Buttons
  */

  onEdit(article: any){

    if(this.edit === true) this.forwardToEditPage(article._id);
    else {
      let position = article.position;
      this.handleSwitchSelects(position, true);
    }
  }

  onSwitch(position: number){
    this.handleSwitchSelects(position, false);
  }

  onConfirmSwitch(event:any){

    const selectedArticle: any = this.articles[this.selected - 1];
    const moveTo: any = this.articles[this.moveTo-1];

    if( this.requestType === 'switch' ){

      const body: any = {
        selected: selectedArticle._id,
        moveTo: moveTo._id
      };
      this.handleSwitchRequest(body);

    }
    else if ( this.requestType === 'insert' ){

      const body: any = {
        id: selectedArticle._id,
        position: moveTo.position
      };
      this.handleInsertRequest(body);

    }
  }

  /*
  *   Navigation
  */

  forwardToEditPage(articleId: string){
    const current: string = location.pathname;
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

    const token: string = window.sessionStorage.getItem('token');

    this.apiService.article_patch_switchPositions(body, token)
    .subscribe( (resp:any) => {
      this.resetPickedArticles();
      this.resetColumnArticles();
    });
  }

  private handleInsertRequest(body: any){

    const token: string = window.sessionStorage.getItem('token');

    this.apiService.article_patch_insertToPosition(body, token)
    .subscribe( (resp:any) => {
      this.resetPickedArticles();
      this.resetColumnArticles();
    });
  }

  private resetColumnArticles(){

    const title: string = this.columnTitle;
    const token: string = window.sessionStorage.getItem('token');

    this.apiService.column_fetchByTitle(title, token)
    .subscribe( (resp: any) => {
      this.articles = [...resp.articles];
      this.selected = -1;
      this.moveTo = -1;
      this.dataSource = new MatTableDataSource(this.articles);
      this.allowSwitch = false;
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
      ? ''
      : `${this.moveTo}`
    }

  }

  updateSwitchIcons(){
    this.selected === -1 && this.moveTo === -1
    ? this.edit = true
    : this.edit = false
  }

  handleSwitchSelects(position: number, toInsert: boolean){

    //clear button clicked when both positions selected
    if(this.requestType !== '' && this.moveTo !== -1 && this.selected == position) return this.resetPickedArticles();

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

    this.handleAllowConfirm();
    this.updateSwitchIcons();
  }

  handleAllowConfirm(){
    if(this.selected !== -1 && this.moveTo !== -1) this.allowSwitch = true;
    else this.allowSwitch = false;
  }

  leftButtonRenderIcon(){

    if(this.edit) return 'edit';
    else return 'keyboard_backspace';
  }

  rightButtonRenderIcon(position: any){
    if( this.selected === position ) return 'clear';
    else if( this.edit ) return 'swap_vertical_circle';
    else return 'swap_vert';
  }

  leftButtonToolTip(){
    if(this.requestType !== '' && this.moveTo !== -1) return 'Undo';
    return this.edit ? 'Edit' : 'Insert';
  }

  rightButtonToolTip(position: any){
    if( this.selected === position ) return 'Clear';
    else if( this.edit ) return 'Switch/Insert';
    else if( this.requestType !== '' && this.moveTo !== -1 ) return 'Undo';
    else return 'Switch';

  }

  resetPickedArticles(){
    this.selected = -1;
    this.moveTo = -1;
    this.edit = !this.edit;
    this.requestType = '';
    if(this.allowSwitch === true) this.allowSwitch = false;
  }

  displayLeftButtonIcon(position: any){

    const sameAsSelected = this.selected !== position && this.requestType === '';
    const insertAndSameAsMoveTo = this.requestType === 'insert' && this.moveTo === position ;

    if( insertAndSameAsMoveTo ) return true; //shows only selected <--
    return sameAsSelected ;
  }

  displayRightButtonIcon(position: any){

    const isNotArchive = this.columnTitle !== 'archive';
    const noSelects = this.selected === -1 && this.moveTo === -1;

    const toSwitch = this.requestType === 'switch';
    const toInsert = this.requestType === 'insert';
    const noMoveTo = this.requestType === '';

    const showClear = this.selected === position;

    const moveToSelected = this.moveTo !== -1;
    const moveToIsPosition = this.moveTo === position;

    if( !isNotArchive ) return false;

    if( isNotArchive && noSelects ) return true;
    else if( showClear ) return true;
    else if( noMoveTo && !moveToSelected ) return true;
    else if( toSwitch && moveToIsPosition ) return true;
    else return false;
  }

  confirmButtonText(type: string){
    if( type === 'switch' ) return 'Confirm Switch';
    else if( type === 'insert' ) return 'Confirm Insert';
    else return 'Confirm';
  }

}
