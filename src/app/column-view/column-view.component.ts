import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.articles.length > 0) this.totalArticles = this.articles.length;

    if(this.switch_selected !== null && this.switch_moveTo !== null) this.allowSwitch = true;
    else this.allowSwitch = false;

  }

  onEdit(event: any){
    let article = this.findArticleFromEvent(event);

    console.log(article);
    //navigate to editor with article data
  }

  onSwitch(event: any){

    let article = this.findArticleFromEvent(event);
    let index = article.position - 1;

    console.log('index: ',index, ' / ',  article['title']);

    // handle select
    if(this.switch === -1) this.switch = index;
    else if(this.switch === index) this.switch = -1;
    else {
      //handle moveTo
      if(this.moveTo === -1) this.moveTo = index;
      else if(this.moveTo === index) this.moveTo = -1
    }

    if(this.switch !== -1 && this.moveTo !== -1) this.allowSwitch = true;
    else this.allowSwitch = false;

    // console.log(`switch: ${this.articles[index].title}, moveTo: ${this.articles[index].title}`);

    // then set click event listnr on confirm btn
    // test it works and re-renders the articles in new order
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
    console.log(event.target)

    if(this.switch === -1 && this.moveTo === -1) return;

    let body: any = {
      selected: {
        position: this.articles[this.switch].position,
        id: this.articles[this.switch]._id
      },
      moveTo: {
        position: this.articles[this.moveTo].position,
        id: this.articles[this.moveTo]._id
      }
    };

    this.submitSwitchRequest(body);
  }

  private submitSwitchRequest(body: any){
    let url: string = 'http://localhost:8000/article/switch';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth': window.sessionStorage.getItem('token')
    })

    this.http
    .patch(url, body, { headers })
    .subscribe( (resp:any) => {
      console.log('Switch Success ==>', resp)
    })
  }

}
