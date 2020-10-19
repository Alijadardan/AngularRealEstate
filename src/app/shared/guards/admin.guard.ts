import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleAdminService } from 'src/app/services/admin/article-admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router : Router,
    private articleAdminService: ArticleAdminService
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(localStorage.getItem('userToken')){
        return this.articleAdminService.getArticles().pipe(map((data)=>{
          if(data){
            return true;
          }else{
            return false;
          }

        }));
      }else{
        return true;
      }
    }
}
