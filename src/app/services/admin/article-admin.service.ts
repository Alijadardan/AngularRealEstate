import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Articles from 'src/app/shared/models/Articles';
import FullArticle from 'src/app/shared/models/FullArticle';

@Injectable({
  providedIn: 'root'
})
export class ArticleAdminService {

  constructor(private http: HttpClient) { }

  getArticles(){
    return this.http.get<Articles>(environment.baseUrl+"/search");
  }

  getArticleById(id){
    return this.http.get<any>(environment.baseUrl+"/article/property/"+id)
  }

  createArticle(data, file){
    console.log(file);
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(environment.baseUrl+"/create-article", {
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
    }, {headers: new HttpHeaders({'Accept': 'application/json'})});
  }

  updateArticle(id, data){
    console.log(id, data.title.toString());
    return this.http.put<any>(environment.baseUrl+"/update-article/"+id, {
      'title': data.title,
      'body': data.body,
      'city': data.city,
      'address': data.address,
      'for': data.for,
      'price': data.price,
      'type': data.type,
      'available': data.available,
      'phonenumber': data.phone_number
    });
  }

  deleteArticle(id){
    return this.http.delete<any>(environment.baseUrl+"/article/delete/"+id);
  }
}
