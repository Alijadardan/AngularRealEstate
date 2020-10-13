import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ContactUs from 'src/app/shared/models/ContactUs';
import SingleContact from 'src/app/shared/models/SingleContact';

@Injectable({
  providedIn: 'root'
})
export class ContactAdminService {

  baseUrl = "http://realestate-task.draft2017.com/api";

  constructor(private http: HttpClient) { }

  getContacts(){
    return this.http.get<ContactUs>(this.baseUrl+"/contact-us", {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')})});
  }

  getContactById(id){
    return this.http.get<SingleContact>(this.baseUrl+"/contact/"+id, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')})})
  }

  deleteContact(id){
    return this.http.delete(this.baseUrl+"/contact/delete/"+id, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')})});
  }
}
