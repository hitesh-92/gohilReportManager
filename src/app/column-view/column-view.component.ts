import { Component, OnInit, Input, OnChanges } from '@angular/core';

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

  constructor() { }

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

  findArticleFromEvent(event:any){
    let position: any = event.target.parentNode.parentNode.childNodes[0].innerText
    let index = parseInt(position) - 1;
    // console.log( this.articles[index] );
    return this.articles[index];
  }

}
