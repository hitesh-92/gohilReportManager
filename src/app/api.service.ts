import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export default class ApiService{
  // url = 'https://gohilreport-api.herokuapp.com';
  api = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  // ****************
  //   USER
  //

  user_signup(body: any){
    const url: string = `${this.api}/user/signup`;
    return this.http.post(url, body);
  }

  user_logIn(body: any){
    const url: string = `${this.api}/user/login`;

    return this.http.post(url, body);
  }

  user_logInWithToken(token: string){
    const url: string = `${this.api}/user/login`;
    const headers = new HttpHeaders({ 'x-auth': token });

    return this.http.post(url, {}, { headers });
  }

  user_logout(body: any){
    const url: string = `${this.api}/user/logout`;
  }

  // ****************
  //   COLUMN
  //

  column_fetchByTitle(title: string, token: string){
    const url: string = `${this.api}/column/${title}`;
    const headers = new HttpHeaders({ 'x-auth': token });

    return this.http.get(url, { headers });
  }

  column_get_columnIds(token: string){
    const url: string = `${this.api}/column/ids`;
    const headers: any = new HttpHeaders({'x-auth': token});

    return this.http.get(url, { headers });
  }




  // ****************
  //   ARTICLE
  //

  article_get_byId(id: string, token: string){
    const url: string = `${this.api}/article/${id}`;
    const headers = new HttpHeaders({'x-auth':token});

    return this.http.get(url, { headers });
  }

  article_post_create(body: any, token: string){
    const url: string = `${this.api}/article`;
    const headers = new HttpHeaders({'x-auth':token});

    return this.http.post(url, body, { headers });
  }

  article_post_archive(body: any, token: string){
    const url: string = `${this.api}/article/archive`;
    const headers = new HttpHeaders({'x-auth':token});

    return this.http.post(url, body, { headers });
  }

  article_patch_updateExisting(body, token){
    const url: string = `${this.api}/article`;
    const headers = new HttpHeaders({'x-auth':token});

    return this.http.patch(url, body, { headers });
  }

  article_patch_removeImage(body: any, token: string){
    const url: string = `${this.api}/article/removeimage`;
    const headers = new HttpHeaders({'x-auth':token});

    return this.http.patch(url, body, { headers });
  }

  article_patch_switchPositions(body: any, token: string){
    const url: string = `${this.api}/article/switch`;
    const headers = new HttpHeaders({'x-auth':token});

    return this.http.patch(url, body, { headers });
  }

  article_patch_insertToPosition(body: any, token: string){
    const url: string = `${this.api}/article/insertposition`;
    const headers = new HttpHeaders({'x-auth':token});

    return this.http.patch(url, body, { headers });
  }


  article_patch_unArchive(body: any, token: string){
    const url: string = `${this.api}/article/unarchive`;
    const headers = new HttpHeaders({'x-auth':token});

    return this.http.patch(url, body, { headers });
  }

  article_delete_destroy(id: string, token: string){
    const url: string = `${this.api}/article/${id}`;
    const headers = new HttpHeaders({'x-auth':token});

    return this.http.delete(url, { headers });
  }




}
