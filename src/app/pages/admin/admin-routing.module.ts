import { SingleContactComponent } from './components/single-contact/single-contact.component';
import { AddEditArticlesComponent } from './components/add-edit-articles/add-edit-articles.component';
import { DirtyCheckGuard } from './../../shared/guards/dirty-check.guard';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { AticlesComponent } from './components/aticles/aticles.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
        component: AticlesComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'about',
        component: AboutComponent,
        canDeactivate: [DirtyCheckGuard]
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
