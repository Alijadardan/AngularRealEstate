import { ArticleAdminService } from './../../../../services/admin/article-admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import Articles from 'src/app/shared/models/Articles';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-aticles',
  templateUrl: './aticles.component.html',
  styleUrls: ['./aticles.component.scss']
})
export class AticlesComponent implements OnInit {

  articles: MatTableDataSource<Articles>;
  displayedColumns: string[] = ['id', 'title', 'city', 'address', 'type','phonenumber'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private articlesAdminService: ArticleAdminService) { }

  ngOnInit(): void {
    this.getArticles();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.articles.filter = filterValue.trim().toLowerCase();

    if (this.articles.paginator) {
      this.articles.paginator.firstPage();
    }
  }

  getArticles(){
    this.articlesAdminService.getArticles().subscribe({
      next: (data) => {
        this.articles = new MatTableDataSource(data['Articles'].data);
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

}
