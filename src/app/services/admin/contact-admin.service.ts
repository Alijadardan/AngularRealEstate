import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ContactUs from 'src/app/shared/models/ContactUs';

@Injectable({
  providedIn: 'root'
})
export class ContactAdminService {

  baseUrl = "http://realestate-task.draft2017.com/api";

  constructor(private http: HttpClient) { }

  getContacts(){
    return this.http.get<ContactUs>(this.baseUrl+"/contact-us", {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')})});
  }
}
