import { ArticleAdminService } from './../../services/admin/article-admin.service';
import { AuthService } from './../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse, HttpParams, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { runInThisContext } from 'vm';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    private authService: AuthService,
    private articleAdminService: ArticleAdminService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('userToken')
    const clonedReq = this.addHeaders(request, token);
    return next.handle(clonedReq).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0 || (error.status === 401 && error.error.title == "Unauthorized")) {
          // this.loginService.logOut();
          Swal.fire({
            text: 'You can not access this page:' + error,
            icon: 'error'
          });
          console.log(error);
        }
        return throwError(error);
      })
    );
  }



  validateToken() {
    new Promise((resolve, rejects) => {
      this.articleAdminService.getArticles().subscribe({
        next: () => {
          resolve();
        },
        error: () => {
          rejects();
        }
      }
      );
    })
  }



  private addHeaders(
    request: HttpRequest<any>,
    token?: string
  ): HttpRequest<any> {
    let clone: HttpRequest<any>;
    let header: HttpHeaders = request.headers;
    let params: HttpParams = request.params;


    if (token !== null) {
      header = header.set('Authorization', `Bearer ` + token);
    }

    clone = request.clone({
      headers: header,
      responseType: request.responseType,
      params: params
    });
    return clone;
  }
}
