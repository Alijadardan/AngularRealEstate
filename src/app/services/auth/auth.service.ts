import { SocialUser } from 'angularx-social-login';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import RegisterUser from 'src/app/shared/models/RegisterUser';
import Token from 'src/app/shared/models/Token';
import LoginUser from 'src/app/shared/models/LoginUser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "http://realestate-task.draft2017.com/api/auth";
  userSource = new BehaviorSubject('');
  currentUser = this.userSource.asObservable();

  constructor(private http: HttpClient) { }

  login(data: LoginUser) {
    return this.http.post<Token>(environment.baseUrl + "/auth/login", data);
  }

  register(data: RegisterUser) {
    return this.http.post<RegisterUser>(environment.baseUrl + "/auth/register", data);
  }

  logout() {
    return this.http.get<any>(environment.baseUrl + "/auth/logout");
  }

  changeUser(user){
    this.userSource.next(user)
  }
}
