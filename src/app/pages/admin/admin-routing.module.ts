import { AdminGuard } from './../../shared/guards/admin.guard';
import { SingleContactComponent } from './components/single-contact/single-contact.component';
import { AddEditArticlesComponent } from './components/add-edit-articles/add-edit-articles.component';
import { DirtyCheckGuard } from './../../shared/guards/dirty-check.guard';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'articles',
        loadChildren: () => import('./components/articles/articles.module').then((m) => m.ArticlesModule),
      },
      {
        path: 'contact',
        component: ContactComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'about',
        component: AboutComponent,
        canDeactivate: [DirtyCheckGuard],
        canActivate: [AdminGuard]
      },
      {
        path: 'contact/view/:id',
        component: SingleContactComponent
      }
    ]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: 'admin' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
