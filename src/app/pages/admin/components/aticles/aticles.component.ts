import { ArticleAdminService } from './../../../../services/admin/article-admin.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import Articles from 'src/app/shared/models/Articles';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Toast } from 'src/app/shared/helpers/Toast';

@Component({
  selector: 'admin-aticles',
  templateUrl: './aticles.component.html',
  styleUrls: ['./aticles.component.scss']
})
export class AticlesComponent implements OnInit, AfterViewInit {

  articles: MatTableDataSource<Articles>;
  displayedColumns: string[] = ['id', 'title', 'city', 'address', 'type','phonenumber', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private articleAdminService: ArticleAdminService) { }

  ngOnInit(): void {
    if(localStorage.getItem('articlesData')){
      this.articles = new MatTableDataSource(JSON.parse(localStorage.getItem('articlesData')));
    }else{
      this.getArticles();
    }
  }

  ngAfterViewInit() {
    if(localStorage.getItem('articlesData')){
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
        // this.articleAdminService.deleteArticle(id).subscribe({
        //   next: () => {
        //     Toast.fire({
        //       icon: 'success',
        //       title: "Successfully Deleted"
        //     })
        //   },
        //   error: error => {
        //     Swal.fire({
        //       text: 'Somthing went wrong :' + error,
        //       icon: 'error'
        //     });
        //   }
        // });
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
        this.articles = new MatTableDataSource(data['Articles'].data);
        this.saveLoaclStorage('articlesData', data['Articles'].data);
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
