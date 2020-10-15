import { ArticlesComponent } from './articles.component';
import { ShowArticlesComponent } from './../show-articles/show-articles.component';
import { DirtyCheckGuard } from './../../../../shared/guards/dirty-check.guard';
import { AddEditArticlesComponent } from './../add-edit-articles/add-edit-articles.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: ArticlesComponent,
  children: [
    {
      path: '', component: ShowArticlesComponent
    },
    {
      path: 'add',
      component: AddEditArticlesComponent,
      canDeactivate: [DirtyCheckGuard]
    },
    {
      path: 'edit/:id',
      component: AddEditArticlesComponent,
      canDeactivate: [DirtyCheckGuard]
    }
  ]
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
