import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';

import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

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
  switch: number = -1;
  moveTo: number = -1;

  //table
  displayedColumns: string[] = ['position', 'title', 'url', 'image', '_id'];
  dataSource;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private http: HttpClient, private location: Location, private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  }

  ngOnInit() {

  }

  ngOnChanges(){
    if(this.articles.length > 0) this.totalArticles = this.articles.length;

    if(this.switch_selected !== null && this.switch_moveTo !== null) this.allowSwitch = true;
    else this.allowSwitch = false;

    this.dataSource = new MatTableDataSource(this.articles);
  }

  onEdit(position: any){
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

  onSwitch(event: any){

    console.log(event)

    // let article = this.findArticleFromEvent(event);
    // let index = article.position - 1;
    //
    // console.log('index: ',index, ' / ',  article['title']);
    //
    // // handle select
    // if(this.switch === -1) this.switch = index;
    // else if(this.switch === index) this.switch = -1;
    // else {
    //   //handle moveTo
    //   if(this.moveTo === -1) this.moveTo = index;
    //   else if(this.moveTo === index) this.moveTo = -1
    // }
    //
    // if(this.switch !== -1 && this.moveTo !== -1) this.allowSwitch = true;
    // else this.allowSwitch = false;
  }

  findArticleFromEvent(event:any){

    let position: any = event.target.id === ""
    ? event.target.parentElement.parentElement.parentElement.children["0"].innerText
    : event.target.id

    let index = parseInt(position) - 1;

    return this.articles[index];
  }

  switchPositionDisplay(title:string){

    if(title === 'selected'){
      return this.switch === -1
      ? '0'
      : `${this.switch + 1}`
    } else {
      return this.moveTo === -1
      ? '0'
      : `${this.moveTo + 1}`
    }

  }

  onConfirmSwitch(event:any){

    if(this.switch === -1 && this.moveTo === -1) return;

    let body: any = {
      selected: this.articles[this.switch]._id,
      moveTo: this.articles[this.moveTo]._id
    };

    this.submitSwitchRequest(body);
  }

  private submitSwitchRequest(body: any){
    const url: string = 'http://localhost:8000/article/switch';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth': window.sessionStorage.getItem('token')
    });

    this.http
    .patch(url, body, { headers })
    .subscribe( (resp:any) => {
      console.log('Switch Success ==>', resp)
      let loc: string = `/app/${this.columnTitle}-column`;
      if(resp.status) location.reload();

    })
  }

}
