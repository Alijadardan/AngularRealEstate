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
    let params = new HttpParams({ fromObject: { price_from: data.minPrice, price_to: "222", city: data.city} });
    console.log(data);
    return this.http.get<any>(this.baseUrl+"/search", { headers, params });
  }
}
