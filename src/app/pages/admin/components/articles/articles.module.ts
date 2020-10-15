import { RouterModule } from '@angular/router';
import { AddEditArticlesComponent } from './../add-edit-articles/add-edit-articles.component';
import { ArticlesComponent } from './articles.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowArticlesComponent } from './../show-articles/show-articles.component';

import { ArticlesRoutingModule } from './articles-routing.module';


@NgModule({
  declarations: [
    ArticlesComponent,
    AddEditArticlesComponent,
    ShowArticlesComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ArticlesModule { }
