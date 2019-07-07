import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export default class ApiService{
  // url = 'https://gohilreport-api.herokuapp.com';
  api = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  user_signup(body: any){
    const url: string = `${this.api}/user/signup`;
    return this.http.post(url, body);
  }

  user_logIn(body: any){
    const url: string = `${this.api}/user/login`;
    return this.http.post(url, body);
  }

  user_logout(body: any){
    const url: string = `${this.api}/user/logout`;
  }




}
