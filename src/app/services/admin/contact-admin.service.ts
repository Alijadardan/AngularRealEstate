import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ContactUs from 'src/app/shared/models/ContactUs';
import SingleContact from 'src/app/shared/models/SingleContact';

@Injectable({
  providedIn: 'root'
})
export class ContactAdminService {

  constructor(private http: HttpClient) { }

  getContacts(){
    return this.http.get<ContactUs>(environment.baseUrl+"/contact-us");
  }

  getContactById(id){
    return this.http.get<SingleContact>(environment.baseUrl+"/contact/"+id)
  }

  deleteContact(id){
    return this.http.delete(environment.baseUrl+"/contact/delete/"+id);
  }
}
