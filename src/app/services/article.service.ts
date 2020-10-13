import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ArticleInfo from '../shared/models/ArticleInfo';
import Articles from '../shared/models/Articles';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  baseUrl = "http://realestate-task.draft2017.com/";

  constructor(private http: HttpClient) { }

  getArticles(){
    return this.http.get<Articles>(this.baseUrl+"/search");
  }

  getArticleInfo(id){
    return this.http.get<ArticleInfo>(this.baseUrl+"/property/"+id);
  }
}
