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
    return this.http.get<Articles>(this.baseUrl+"/search", {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')})});
  }

  getArticleById(id){
    return this.http.get<any>(this.baseUrl+"/article/property/"+id, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')})})
  }

  createArticle(data, file){
    console.log(file);
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(this.baseUrl+"/create-article", {
      'title': data.title,
      'body': data.body,
      'price': data.price,
      'address': data.address,
      'city': data.city,
      'for': data.for,
      'phone_number': data.phone_number,
      'filenames': formData,
      'type': data.type,
      'available': data.available
    }, {headers: new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('userToken')})});
  }

  updateArticle(id, data){
    console.log(id, data.title.toString());
    return this.http.put<any>(this.baseUrl+"/update-article/"+id, {
      'title': data.title,
      'body': data.body,
      'city': data.city,
      'address': data.address,
      'for': data.for,
      'price': data.price,
      'type': data.type,
      'available': data.available,
      'phonenumber': data.phone_number
    }, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')})});
  }

  deleteArticle(id){
    return this.http.delete<any>(this.baseUrl+"/article/delete/"+id, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')})});
  }
}
