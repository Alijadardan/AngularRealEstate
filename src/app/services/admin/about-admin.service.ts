import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AboutUs from 'src/app/shared/models/AboutUs';
import Message from 'src/app/shared/models/Message';

@Injectable({
  providedIn: 'root'
})
export class AboutAdminService {

  baseUrl = "http://realestate-task.draft2017.com/api";

  constructor(private http: HttpClient) { }

  getAboutUs(){
    return this.http.get(this.baseUrl+"/about-us", {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')})});
  }

  updateAboutUs(data: AboutUs){
    return this.http.put<Message>(this.baseUrl+"/update/about-us", data, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')})});
  }
}
