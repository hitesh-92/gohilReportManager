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

  columnName = '{name} column';
  /*
  articles = [
    {
      _id: '123qwe',
      title: 'article name',
      url: 'www.webone.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 0,
      position: 1
    },
    {
      _id: '456rty',
      title: 'another article',
      url: 'www.ttwwoo.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 0,
      position: 2
    },
    {
      _id: '789uio',
      title: 'yet another article',
      url: 'www.three.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 0,
      position: 3
    },
    {
      _id: '789uio',
      title: 'yet another article',
      url: 'www.three.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 0,
      position: 4
    },
    {
      _id: '789uio',
      title: 'yet another article',
      url: 'www.three.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 0,
      position: 5
    },
    {
      _id: '789uio',
      title: 'yet another article',
      url: 'www.three.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 0,
      position: 6
    },
    {
      _id: '789uio',
      title: 'yet another article',
      url: 'www.three.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 0,
      position: 7
    }
  ];
  */

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.articles.length > 0) this.totalArticles = this.articles.length
  }

  onDrag(e: Event){
    return;
    // console.log(e)
  }

}
