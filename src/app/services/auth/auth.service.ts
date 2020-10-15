import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import RegisterUser from 'src/app/shared/models/RegisterUser';
import Token from 'src/app/shared/models/Token';
import LoginUser from 'src/app/shared/models/LoginUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "http://realestate-task.draft2017.com/api/auth";

  constructor(private http: HttpClient) { }

  login(data: LoginUser) {
    return this.http.post<Token>(environment.baseUrl + "auth/login", data);
  }

  register(data: RegisterUser) {
    return this.http.post<RegisterUser>(environment.baseUrl + "auth/register", data);
  }

  logout(token) {
    return this.http.get<any>(environment.baseUrl + "auth/logout", {headers: new HttpHeaders({'Authorization': 'Bearer ' + token})});
  }
}
