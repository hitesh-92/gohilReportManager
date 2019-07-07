import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// import { HttpClient, HttpHeaders } from '@angular/common/http';
import ApiService from '../api.service';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private http: HttpClient
    private apiService: ApiService
  ) { }

  // ----

  pathFrom: string;
  articleType: string;
  defaultColumn: string;
  postRoute: string;
  columnIds: any;
  columnArticleCount: any = {
    left: null,
    center: null,
    right: null,
    alert: null,
    archive: null
  }

  pageTitle: string;
  article: any = {
    title:     '',
    url:       '',
    image:     '',
    position:  '',
    createdAt: '',
    updatedAt: '',
    status:    '',
    _id:       '',
    column:    ''
  }

  input_title: string;
  input_url: string;
  input_imageToggle: boolean = false;
  input_image: string;
  input_positionToggle: boolean = false;
  input_position: number;

  actionType: string;
  actions: string[];

  selectedColumn: string;
  columns: any = [
    { value: 'left', viewValue: 'Left' },
    { value: 'Center', viewValue: 'Center' },
    { value: 'Right', viewValue: 'Right' },
    { value: 'Alert', viewValue: 'Alert' }
  ];

  allowUpdateExisting: any = true;
  allowButtonAuthApply: boolean = false;
  buttonAuthValidation: string;

  ngOnInit() {
    const id: any = this.route.snapshot.params['id'];
    const column: any = this.route.snapshot.params['column'];
    const routeUrls: any = this.getRouteUrl(column);

    this.validateRouteUrls(routeUrls);
    this.pathFrom = routeUrls.appUrl;
    this.defaultColumn = routeUrls.column;

    // console.log(` ${routeUrls.appUrl} | ${routeUrls.column} | app/${column}`)

    this.fetchColumnIds(); //get all ids to assign to this.columns
    //update this.fetchColumnIds to behave as expected
    // console.log('route::: ' + routeUrls.column)

    if( id === 'new' ) this.setUpCreateNewArticle();
    // else if( routeUrls === 'Archive' ) {console.log('AAA');this.setUpArchived(id)}
    else this.setUpEditExistingArticle(id)
      //if articles does not exist route to overview / check token valid
      //get article and update current

    //else if (archive) ....
  }

  ngOnChanges(){
  }

  getRouteUrl(route: string){
    let url: string = 'http://localhost:8000/column/';
    let appUrl: string = `/app/${route}`;
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
    this.setExisitingArticle(id);
    // console.log('###', this.defaultColumn === 'Archive')
    if( this.defaultColumn === 'Archive' ){
      this.actions = ['Update', 'Delete', 'unArchive'];
    } else {
      this.actions = ['Update', 'Delete', 'Archive'];
    }

    return;
  }

  setUpArchived(id: string){
    console.log(111111)
    this.articleType = 'archive';
    this.pageTitle = `#${id}`;
    this.setExisitingArticle(id);

    return;
  }

  // -----


  /*
  * Buttons
  */

  onCreateNewArticle(){
    //this.selectedColumn==undefind if not selected

    var imageUrl: string = this.input_imageToggle ? imageUrl = this.input_image : null;

    const column: string = this.selectedColumn === undefined
    ? this.getColumnIdUsingPathFrom(this.pathFrom) //this.article.column // set to same as pathFrom
    : this.selectedColumn;

    var position: number;
    const maxPosition: number = this.getColumnLengthMax(this.defaultColumn);

    if( this.input_positionToggle ){
      this.input_position < maxPosition
      ? position = this.input_position
      : position = maxPosition;
    } else {
      position = maxPosition
    };

    const body: any = {
      title: this.input_title,
      url: this.input_url,
      image: imageUrl,
      column: column,
      position: position
    };

    console.log(body)

    this.submitCreateNewArticle(body);
  }

  onUpdateExisting(){

    // console.log('DO you really want to UPDATE this?');
    // ADD VALIDATIONS
    // console.log(this.input_title, this.input_url, this.input_image);

    let body: any = {};
    body.id = this.article._id;
    if(this.input_title !== undefined) body.title = this.input_title;
    if(this.input_url   !== undefined) body.url = this.input_url;


    // if image exists and want to remove use /article/removeimage
    // then send updateRequest without an image property
    if( this.article.image !== null && this.input_imageToggle === false ){
      const onlyRemoveImage = this.input_title===undefined && this.input_url===undefined;
      if( onlyRemoveImage ){
        return this.subimtRemoveArticleImage(this.article._id, true);
      } else {
        this.subimtRemoveArticleImage(this.article._id, false);
      }

    }
    else if( this.input_image !== undefined ) body.image = this.input_image;

    if( this.input_positionToggle ) body.position = this.input_position;

    console.log('updateExisting toSubmit ==> ', body);

    this.submitUdateExistingArticle(body);

  }

  onArchiveArticle(){
    // console.log('DO you really want to ARCHIVE this?');
    const id: string = this.article._id;
    this.submitArchiveArticle(id);

  }

  onDeleteExisting(){
    console.log('DO you really want to DELETE this?');
    const id: string = this.article._id;
    // console.log(id)
    this.submitDeleteRequest(id);
  }

  onUn_ArchiveArticle(){
    // console.log('DO you really want to UN-ARCHIVE this?');
    // console.log(this.article);
    const id: string = this.article._id;
    this.submitUn_ArchiveArticle(id);
  }

  // -----


  /*
  * HTTP
  */

  private fetchColumnIds(){

    const token: string = window.sessionStorage.getItem('token');
    // const headers: any = new HttpHeaders({'x-auth': token})

    // this.http.get('http://localhost:8000/column/ids', { headers })
    this.apiService.column_get_columnIds(token)
    .subscribe((resp:any) => {

      if(resp.error) return; //HANDLE ERROR

      this.columnIds = resp.columns;

      resp.columns.forEach(column => {
        const id = column._id

        if(column.title == 'left') {
          this.columns[0].value = id;
          this.columnIds.left = id;
          this.columnArticleCount.left = column.count;
        }
        else if(column.title == 'center') {
          this.columns[1].value = id;
          this.columnIds.center = id;
          this.columnArticleCount.center = column.count;
        }
        else if(column.title == 'right') {
          this.columns[2].value = id;
          this.columnIds.right = id;
          this.columnArticleCount.right = column.count;
        }
        else if(column.title == 'alert') {
          this.columns[3].value = id;
          this.columnIds.alert = id;
          this.columnArticleCount.alert = column.count;
        }
        else if(column.title == 'archive') {
          this.columnIds.archive = id;
          this.columnArticleCount.archive = column.count;
        }

      });

      //if creating new article place at bottom on column by default
      if( this.articleType === 'new' ){
        this.input_position = this.getColumnLengthMax(this.defaultColumn);
      }
      else if( this.articleType === 'existing' ){
        this.input_position = this.article.position;
      }


    })

  }

  private setExisitingArticle(id:string){

    const token: string = window.sessionStorage.getItem('token');
    // const url: string = `http://localhost:8000/article/${id}`;
    // const headers = new HttpHeaders({'x-auth':token});

    // this.http.get(url, {headers})
    this.apiService.article_get_byId(id, token)
    .subscribe( (resp:any) => {
      // console.log('GOT ARTICLE ==> ', resp)
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

      if(resp.article.image !== null) this.input_imageToggle = true;
      this.input_position = resp.article.position;
    });

  }

  private submitCreateNewArticle(body: any){

    // const url: string = 'http://localhost:8000/article';
    const token: string = window.sessionStorage.getItem('token');
    // const headers: any = new HttpHeaders({'x-auth':token, 'Content-Type':'application/json'});

    // this.http.post(url, body, { headers })
    this.apiService.article_post_create(body, token)
    .subscribe( (resp: any) => {
      console.log('Article Saved ==> ', resp);
      this.navigateBackToPathFrom()
    });
  }

  private submitUdateExistingArticle(body: any){

    const token = window.sessionStorage.getItem('token');
    // const url: string = 'http://localhost:8000/article/';
    // const headers = new HttpHeaders({'x-auth':token, 'Content-Type':'application/json'});

    // console.log(body)

    // this.http.patch(url, body, {headers})
    this.apiService.article_patch_updateExisting(body, token)
    .subscribe( (resp:any) => {
      // console.log('PATCHED ==> ', resp)
      this.navigateBackToPathFrom();
    });

  }

  private subimtRemoveArticleImage(id: string, navigateBack: boolean){

    const token = window.sessionStorage.getItem('token');
    // const url: string = 'http://localhost:8000/article/removeimage';
    // const headers = new HttpHeaders({'x-auth':token, 'Content-Type':'application/json'});

    const body: any = { id: id };

    // this.http.patch(url, body, {headers})
    this.apiService.article_patch_removeImage(body, token)
    .subscribe( (resp:any) => {
      // console.log('Image Deleted ==> ', resp)
      if( navigateBack ){
        this.navigateBackToPathFrom();
      }
    });

  }

  private submitArchiveArticle(id: string){
    const token: string = window.sessionStorage.getItem('token');

    // const url: string = 'http://localhost:8000/article/archive';
    const body: any = { id: id };
    // const headers: any = new HttpHeaders({'x-auth': token, 'Content-Type': 'application/json'});

    // this.http.post(url, body, { headers })
    this.apiService.article_post_archive(body, token)
    .subscribe( (resp: any) => {
      // console.log('Article Archived: ', resp);
      return this.navigateBackToPathFrom();
    })
  }

  private submitUn_ArchiveArticle(id: string){
    const token: string = window.sessionStorage.getItem('token');

    // const url: string = 'http://localhost:8000/article/archive/unarchive';
    const body: any = { id: id };
    // const headers: any = new HttpHeaders({'x-auth': token, 'Content-Type': 'application/json'});

    // this.http.patch(url, body, { headers })
    this.apiService.article_patch_unArchive(body, token)
    .subscribe( (resp: any) => {
      // console.log('Article UN__Archived: ', resp);
      this.navigateBackToPathFrom()
    });

  }

  private submitDeleteRequest(id: string){
    const token: string = window.sessionStorage.getItem('token');



    // const url: string = 'http://localhost:8000/article';
    // const url: string = `http://localhost:8000/article/${id}`;
    // const body: any = { id: id };
    // const headers: any = new HttpHeaders({'x-auth': token});

    // console.log('DELETINGGGGG', token, headers)

    // this.http.delete(url, { headers })
    this.apiService.article_delete_destroy(id, token)
    .subscribe( (resp: any) => {
      console.log('Article DELETED: ', resp);
      this.navigateBackToPathFrom()
    })

    // this.router.navigate([this.pathFrom]);

  }

  // -----

  /*
  * Navigation
  */

  navigateBackToPathFrom(){
    this.router.navigate([this.pathFrom]);
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

  buttonAtuhValidate(event: any){
    const input: string = event.target.value.toLowerCase();

    if(input.length > 4) return;

    const id: string = this.article._id;
    const idValidation: string = this.article._id.slice(id.length-4, id.length);
    if(input === idValidation) this.allowButtonAuthApply = true;
    else this.allowButtonAuthApply = false;
  }

  // -----

  /*
  *   Logic
  */

  getColumnIdUsingPathFrom(path: string){
    let foundColumn: any;
    path = path.split('/')[2];

    switch(path){
      case 'left-column':
        foundColumn = this.columnIds.filter(({title}) => title === 'left');
        break;
      case 'center-column':
        foundColumn = this.columnIds.filter(({title}) => title === 'center');
        break;
      case 'right-column':
        foundColumn = this.columnIds.filter(({title}) => title === 'right');
        break;
      case 'alerts':
        foundColumn = this.columnIds.filter(({title}) => title === 'alert');
        break;
      case 'archives':
        foundColumn = this.columnIds.filter(({title}) => title === 'archive');
        break;
      default: return 'somethingIsVeryWrong-checoutOut-function->getColumnIdUsingPathFrom';
    }
    return foundColumn[0]._id;
  }

  getColumnLengthMax(name: string){
    name = name.toLowerCase();
    if( this.columnArticleCount.hasOwnProperty(name) ) return this.columnArticleCount[name] + 1;
    else  console.log('LOGIC ERRRRRRRRRRRRR ==> getColumnLength')
  }



}
