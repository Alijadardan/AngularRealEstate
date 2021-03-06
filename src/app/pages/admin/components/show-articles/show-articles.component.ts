import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ArticleAdminService } from './../../../../services/admin/article-admin.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Toast } from 'src/app/shared/helpers/Toast';
import Articles from 'src/app/shared/models/Articles';

@Component({
  selector: 'app-show-articles',
  templateUrl: './show-articles.component.html',
  styleUrls: ['./show-articles.component.scss']
})
export class ShowArticlesComponent implements OnInit, AfterViewInit {

  articles: MatTableDataSource<Articles>;
  displayedColumns: string[] = ['id', 'title', 'city', 'address', 'type','phonenumber', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private articleAdminService: ArticleAdminService,
    private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('articlesData') && (localStorage.getItem('articlesData') == undefined)){
      this.articles = new MatTableDataSource(JSON.parse(localStorage.getItem('articlesData')));
    }else{
      this.getArticles();
    }
  }

  ngAfterViewInit() {
    if(localStorage.getItem('articlesData') && (localStorage.getItem('articlesData') == undefined)){
      this.articles.paginator = this.paginator;
      this.articles.sort = this.sort;
    }
  }

  deleteArticle(id){
    Swal.fire({
      title: 'Are you sure you want to delete this article?',
      showCancelButton: true,
      confirmButtonText: `Delete`,
      cancelButtonText: `Cancel`,
      icon: 'warning'
    }).then((result) => {
      if(result.isConfirmed){
        console.log('delete', id);
        let placeholder;
        let index;
        let counter = 0;
        this.articles = new MatTableDataSource(this.articles.data.filter(function(obj){
          counter++;
          if (obj.id == id) {
            placeholder =  obj;
            index = --counter;
          }
          return obj.id != id;
        }));
        localStorage.removeItem('contactData');
        this.articles.paginator = this.paginator;
        this.articles.sort = this.sort;
        this.articles._updateChangeSubscription();
        this.articleAdminService.deleteArticle(id).subscribe({
          next: () => {
            Toast.fire({
              icon: 'success',
              title: "Successfully Deleted"
            })
            localStorage.removeItem('articlesData');
            this.router.navigate(['admin/articles']);
          },
          error: error => {
            this.articles.data.splice(index, 0, placeholder);
            this.articles._updateChangeSubscription();
            Swal.fire({
              text: 'Somthing went wrong :' + error,
              icon: 'error'
            });
          }
        });
      }else{
        return;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.articles.filter = filterValue.trim().toLowerCase();

    if (this.articles.paginator) {
      this.articles.paginator.firstPage();
    }
  }

  getArticles(){
    this.articleAdminService.getArticles().subscribe({
      next: (data) => {
        console.log(data['Articles']);
        this.articles = new MatTableDataSource(data['Articles']);
        this.saveLoaclStorage('articlesData', data['Articles']);
        this.articles.paginator = this.paginator;
        this.articles.sort = this.sort;
      },
      error: error => {
        Swal.fire({
          text: 'Somthing went wrong :' + error,
          icon: 'error'
        });
      }
    });
  }

  saveLoaclStorage(key, data){
    if(!localStorage.getItem(key)){
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

}
