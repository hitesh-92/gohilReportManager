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
  switch: number = 0;
  moveTo: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.articles.length > 0) this.totalArticles = this.articles.length;

    // if(this.switch_selected !== null && this.switch_moveTo !== null) this.allowSwitch = true;
    // else this.allowSwitch = false;

  }

  onEdit(event: any){
    let article = this.findArticleFromEvent(event);

    console.log(article);
    //navigate to editor with article data
  }

  onSwitch($event: any){
    let article = this.findArticleFromEvent(event);
    let index = article.position - 1;

    if(this.switch == 0) this.switch = index;
    else if(this.switch>0 && index == this.switch) this.switch = 0;
    else {
      if(this.moveTo>0 && index == this.moveTo) this.moveTo = 0
      else if(this.switch>0) this.moveTo = index;
    }


    // console.log(article.title)

    if(this.switch>0 && this.moveTo>0) this.allowSwitch = true;
    else this.allowSwitch = false;

    console.log(`switch: ${this.articles[this.switch].title}, moveTo: ${this.articles[this.moveTo].title}`);

    // bind confirm btton disable attr
    // then set click event listnr on confirm btn
    // test it works and re-renders the articles in new order
  }

  findArticleFromEvent(event:any){
    let position: any = event.target.parentNode.parentNode.childNodes[0].innerText
    let index = parseInt(position) - 1;
    // console.log( this.articles[index] );
    return this.articles[index];
  }

}
