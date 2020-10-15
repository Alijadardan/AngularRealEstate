import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Contact from '../shared/models/Contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  create(data: Contact){
    return this.http.post(environment.baseUrl+"/contactus", data)
  }
}
