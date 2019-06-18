import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  articleTitle = 'Color-hex.com also generates a simple css code for the selected color. Html element samples are also shown below the color detail page.';
  articleUrl = 'http://www.example.com';
  imageUrl = 'http://somwhere.com/someimageLink';
  articleColumn = 'left';
  isArchived = false;

  allowUpdate = true; //allow if validated

  //update article values
  updatedArticleURL = '';
  updatedImageURL = '';

  ////////////////////////////////////////////////////////////////////////
  tmpColumnId: any;
  // ----

  pathFrom: string;
  articleType: string;
  defaultColumn: string;
  postRoute: string;

  pageTitle: string;
  article: any;

  input_title: string;
  input_url: string;
  input_image: string;

  selectedColumn: string;
  columns: any = [
    { value: 'Left', viewValue: 'Left' },
    { value: 'Center', viewValue: 'Center' },
    { value: 'Right', viewValue: 'Right' },
    { value: 'Alert', viewValue: 'Alert' }
  ];


  ngOnInit() {
    const id: any = this.route.snapshot.params['id'];
    const column: any = this.route.snapshot.params['column'];
    const routeUrls: any = this.getRouteUrl(column);

    this.validateRouteUrls(routeUrls);
    this.pathFrom = routeUrls.appUrl;
    this.defaultColumn = routeUrls.column;

    this.fetchColumnIds(); //get all ids to assign to this.columns
    //update this.fetchColumnIds to behave as expected

    if( id === 'new' ) this.setUpCreateNewArticle();
    else this.setUpEditExistingArticle(id)
      //if articles does not exist route to overview / check token valid
      //get article and update current
  }

  getRouteUrl(route: string){
    let url: string = 'http://localhost:8000/column/';
    let appUrl: string = '/app/route'
    switch(route){

      case 'left-column':
      return { fetch: url+'left', appUrl, column: 'Left' };

      case 'center-column':
      return { fetch: url+'center', appUrl, column: 'Center'};

      case 'right-column':
      return { fetch: url+'right', appUrl, column: 'Right'};

      case 'alerts':
      return { fetch: url+'alert', appUrl, column: 'Alert'};

      case 'archives':
      return { fetch: url+'archive', appUrl, column: 'Archive'};

      default: return {fetch: false, appUrl: false};
    }
  }

  private fetchColumnIds(){

    const token: string = window.sessionStorage.getItem('token');
    const headers: any = new HttpHeaders({'x-auth': token})

    this.http.get('http://localhost:8000/column/left', { headers })
    .subscribe((resp:any) => {
      this.tmpColumnId = resp.columnData._id
    })

  }

  setUpCreateNewArticle(){
    this.articleType = 'new';
    this.pageTitle = 'New Article';

    this.article = {
      title: 'Set Title To Display',
      url: 'Add Link To Article',
      image: 'Add Link To Relevent Image or Leave Blank',
      position: 0
    }

  }

  validateRouteUrls(routes){
    if(routes.fetch == false) this.router.navigate(['/app/overview']);
    // check token etc....
  }

  setUpEditExistingArticle(id: string){
    this.articleType = 'existing';
    this.pageTitle = `#${id}`;
    return;

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
    // console.log('DO you really want to UPDATE this?');
    console.log(this.input_title)
    console.log(this.input_url)
    console.log(this.input_image)
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

  // edit editor body color if archived
  colorEditor(){
    // return this.isArchived == false ? 'white' : '#fbf6d9';
    //color the background to show its an archived file
  }

  onCreateNewArticle(){
    //this.selectedColumn==undefind if not selected
    console.log('ABOUT TO CREATE NEW ARTICLE')

    //add validations

    const token: string = window.sessionStorage.getItem('token');

    const url: string = 'http://localhost:8000/article';
    const body: any = {
      title: this.input_title,
      url: this.input_url,
      image: 'www.testimage.com',
      column: this.tmpColumnId,
      position: 1
    };

    const headers: any = new HttpHeaders({'x-auth':token, 'Content-Type':'application/json'});

    this.http
    .post(url,body,{headers})
    .subscribe((resp: any) => {
      console.log(resp)
      console.log('now navigate back to column view')
    })

  }


}
