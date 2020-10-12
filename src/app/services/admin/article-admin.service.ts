import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Articles from 'src/app/shared/models/Articles';
import FullArticle from 'src/app/shared/models/FullArticle';

@Injectable({
  providedIn: 'root'
})
export class ArticleAdminService {

  baseUrl = "http://realestate-task.draft2017.com/api";

  constructor(private http: HttpClient) { }

  getArticles(){
    return this.http.get<Articles>(this.baseUrl+"/article", {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')})});
  }

  getArticleById(id){
    return this.http.get<any>(this.baseUrl+"/article/property/"+id, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')})})
  }

  createArticle(data){
    return this.http.post<any>(this.baseUrl+"create-article", data, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')})});
  }
}
