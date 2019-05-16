import { Component, OnInit } from '@angular/core';

export interface Column {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  constructor() { }

  selectedColumn: string;

  columns: Column[] = [
    { value: 'Left', viewValue: 'Left' },
    { value: 'Center', viewValue: 'Center' },
    { value: 'Right', viewValue: 'Right' },
    { value: 'Alert', viewValue: 'Alert' }
  ];

  ngOnInit() {
  }

}
