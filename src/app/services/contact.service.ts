import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Contact from '../shared/models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl = "http://realestate-task.draft2017.com/api";

  constructor(private http: HttpClient) { }

  create(data: Contact){
    return this.http.post(this.baseUrl+"/contactus", data)
  }
}
