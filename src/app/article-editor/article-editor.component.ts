import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  // ----

  pathFrom: string;
  articleType: string;
  defaultColumn: string;
  postRoute: string;
  columnIds: any;

  pageTitle: string;
  article: any = {
    title: '',
    url: '',
    image: '',
    position: '',
    createdAt: '',
    updatedAt: '',
    status: '',
    _id: '',
    column: ''
  }

  input_title: string;
  input_url: string;
  input_image: string;

  // actionUpdate: boolean = false;
  actionType: string;
  actions: string[] = ['Update', 'Delete', 'Archive'];

  selectedColumn: string;
  columns: any = [
    { value: 'left', viewValue: 'Left' },
    { value: 'Center', viewValue: 'Center' },
    { value: 'Right', viewValue: 'Right' },
    { value: 'Alert', viewValue: 'Alert' }
  ];

  allowUpdateExisting: any = true;


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

    //else if (archive) ....
  }

  ngOnChanges(){

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

  colorEditor(){
    // return this.isArchived == false ? 'white' : '#fbf6d9';
    //color the background to show its an archived file
    // edit editor body color if archived
  }

  /*
  * Editor Set Up
  */

  setUpCreateNewArticle(){
    this.articleType = 'new';
    this.pageTitle = 'New Article';

    this.article = {
      title: 'Set Title To Display',
      url: 'Add Link To Article',
      image: 'Add Link To Image or Leave Blank',
      position: 0
    }

  }

  setUpEditExistingArticle(id: string){
    this.articleType = 'existing';
    this.pageTitle = `#${id}`;

    this.setExisitingArticle(id)

    return;

    // const article = this.fetchArticle(id)

  }

  // -----


  /*
  * Buttons
  */

  onCreateNewArticle(){
    //this.selectedColumn==undefind if not selected
    console.log('ABOUT TO CREATE NEW ARTICLE')

    //add validations

    const column: string = this.selectedColumn===undefined
    ? this.article.column // set to same as pathFrom
    : this.selectedColumn;

    const token: string = window.sessionStorage.getItem('token');

    const url: string = 'http://localhost:8000/article';
    const body: any = {
      title: this.input_title,
      url: this.input_url,
      image: 'www.testimage.com',
      column: column,
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

  onUpdateExisting(){

    // console.log('DO you really want to UPDATE this?');
    // ADD VALIDATIONS

    // console.log(this.input_title, this.input_url, this.input_image);

    let body: any = {};
    body.id = this.article._id;
    console.log(this.article._id)
    if(this.input_title !== undefined) body.title = this.input_title;
    if(this.input_url   !== undefined) body.url = this.input_url;
    if(this.input_image !== undefined) body.image = this.input_image;

    const column: string = this.selectedColumn===undefined
    ? this.article.column
    : this.selectedColumn;

    const token = window.sessionStorage.getItem('token');
    const url: string = 'http://localhost:8000/article/';
    const headers = new HttpHeaders({'x-auth':token, 'Content-Type':'application/json'})

    this.http.patch(url, body, {headers})
    .subscribe( (resp:any) => {
      console.log('PATCHED ==> ', resp)
    });

  }

  onArchiveExisting(){
    console.log('DO you really want to ARCHIVE this?');
  }

  onDeleteExisting(){
    console.log('DO you really want to DELETE this?');
  }

  onUnarchive(){
    console.log('DO you really want to UN-ARCHIVE this?')
  }

  // -----


  /*
  * HTTP
  */

  private fetchColumnIds(){

    const token: string = window.sessionStorage.getItem('token');
    const headers: any = new HttpHeaders({'x-auth': token})

    this.http.get('http://localhost:8000/column/ids', { headers })
    .subscribe((resp:any) => {
      // this.tmpColumnId = resp.columnData._id
      // console.log('IDS ==> ', resp)

      if(resp.error) return; //HANDLE ERROR

      this.columnIds = resp.columns;
      // console.log(resp)

      resp.columns.forEach(column => {
        const id = column._id

        if(column.title == 'left') {
          this.columns[0].value = id;
          this.columnIds.left = id;
        }
        else if(column.title == 'center') {
          this.columns[1].value = id;
          this.columnIds.center = id;
        }
        else if(column.title == 'right') {
          this.columns[2].value = id;
          this.columnIds.right = id;
        }
        else if(column.title == 'alert') {
          this.columns[3].value = id;
          this.columnIds.alert = id;
        }
        else if(column.title == 'archive') {
          this.columnIds.archive = id;
        }

      })

    })

  }

  private setExisitingArticle(id:string){

    const token: string = window.sessionStorage.getItem('token');
    const url: string = `http://localhost:8000/article/${id}`;
    const headers = new HttpHeaders({'x-auth':token});

    this.http.get(url, {headers})
    .subscribe( (resp:any) => {
      console.log('GOT ARTICLE ==> ', resp)
      if(!resp.found) return; //HANDLE ERROR

      this.defaultColumn = resp.column.title;

      this.article.title = resp.article.title;
      this.article.url = resp.article.url;
      this.article.image = resp.article.image;
      this.article.position = resp.article.position;
      this.article.createdAt = new Date(resp.article.createdAt).toLocaleDateString();
      this.article.updatedAt = new Date(resp.article.updatedAt).toLocaleDateString();
      this.article._id = resp.article._id;
      this.article.status = resp.article.status;
      this.article.column = resp.article.column;
    });

  }

  // -----

  /*
  * Valdiations
  */

  validateRouteUrls(routes){
    if(routes.fetch == false) this.router.navigate(['/app/overview']);
    // check token etc....
  }

  allowUpdate(){
    return;
  }

  // -----

}
