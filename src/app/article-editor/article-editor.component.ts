import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  selectedColumn: string;

  newArticle: boolean = true;

  article: any;

  columns: any = [
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

  pageTitle: string;

  //update article values
  input_title = '';
  updatedArticleURL = '';
  updatedImageURL = '';

  // edit editor body color if archived
  colorEditor(){
    return this.isArchived == false ? 'white' : '#fbf6d9';
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];

    if( id === 'new' ) {
      this.setUpCreateNewArticle();
    }
    else {

      // this.setUpEditExistingArticle(id)
      //if articles does not exist route to overview / check token valid
      //get article and update current
    }


    //get all columnIds
    // this.fetchColumnIds()
  }

  setUpCreateNewArticle(){

    this.pageTitle = 'New Article';

    this.article = {
      title: 'Set Title To Display',
      url: 'Add URL To Article',
      image: 'Add Link To Relevent Image or Leave Blank'
    }

  }

  setUpEditExistingArticle(id: string){
    this.newArticle = false;
    this.pageTitle = `#${id}`;

    // const article = this.fetchArticle(id)

  }

  //  article update data
  onUpdateArticleTitle({target: {value}}){

    // console.log(value)
    // this.input_title = value;
    return;
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
