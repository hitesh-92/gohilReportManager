import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-column-view',
  templateUrl: './column-view.component.html',
  styleUrls: ['./column-view.component.css']
})
export class ColumnViewComponent implements OnInit {

  columnName = '{name} column';
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

  constructor() { }

  ngOnInit() {
  }

  onDrag(e: Event){
    console.log(e)
  }

}
