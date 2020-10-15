import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AboutUs from 'src/app/shared/models/AboutUs';
import Message from 'src/app/shared/models/Message';

@Injectable({
  providedIn: 'root'
})
export class AboutAdminService {

  constructor(private http: HttpClient) { }

  getAboutUs(){
    return this.http.get(environment.baseUrl+"/about-us", {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')})});
  }

  updateAboutUs(data: AboutUs){
    return this.http.put<Message>(environment.baseUrl+"/update/about-us", data, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')})});
  }
}
