import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  searchParam(data){
    let headers = new HttpHeaders;
    console.log(data);
    return this.http.get<any>(environment.baseUrl+"/search", { headers, params: data });
  }
}
