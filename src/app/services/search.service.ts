import { HttpClient, HttpHeaders, HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl = "http://realestate-task.draft2017.com/api";

  constructor(private http: HttpClient) { }

  searchParam(data){
    let headers = new HttpHeaders;
    console.log(data);
    return this.http.get<any>(this.baseUrl+"/search", { headers, params: data });
  }
}
