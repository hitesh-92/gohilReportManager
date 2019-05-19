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

  articleTitle = 'Color-hex.com also generates a simple css code for the selected color. Html element samples are also shown below the color detail page.';
  articleUrl = 'http://www.example.com';
  imageUrl = 'http://somwhere.com/someimageLink';
  articleColumn = 'left';
  isArchived = false;

  allowUpdate = true; //allow if validated

  //update article values
  updatedArticleTitle = '';
  updatedArticleURL = '';
  updatedImageURL = '';

  // edit editor body color if archived
  colorEditor(){
    return this.isArchived == false ? 'white' : '#fbf6d9';
  }

  ngOnInit() {
  }

  //  article update data
  onUpdateArticleTitle({target: {value}}){

    // console.log(value)
    this.updatedArticleTitle = value;
  }

  //  buttons

  onUpdate(){
    console.log('DO you really want to UPDATE this?');
  }

  onArchive(){
    console.log('DO you really want to ARCHIVE this?');
  }

  onDelete(){
    console.log('DO you really want to DELETE this?');
  }

  onUnarchive(){
    console.log('DO you really want to UN-ARCHIVE this?')
  }

}
