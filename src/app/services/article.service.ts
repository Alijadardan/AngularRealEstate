import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ArticleInfo from '../shared/models/ArticleInfo';
import Articles from '../shared/models/Articles';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticles(){
    return this.http.get<Articles>(environment.baseUrl+"/search");
  }

  getArticleInfo(id){
    return this.http.get<ArticleInfo>(environment.baseUrl+"/property/"+id);
  }
}
