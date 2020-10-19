import { ArticleDetailsComponent } from './../../components/article-details/article-details.component';
import { SearchFormComponent } from './../../components/search-form/search-form.component';
import { DirtyCheckGuard } from './../../shared/guards/dirty-check.guard';
import { HomeComponent } from './home.component';
import { ContactComponent } from 'src/app/components/contact/contact.component';
import { HomeLayoutComponent } from '../../components/home-layout/home-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from 'src/app/components/about/about.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: '',
        component: HomeLayoutComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'contact',
        component: ContactComponent,
        canDeactivate: [DirtyCheckGuard]
      }
      ,
      {
        path: 'article-details',
        component: ArticleDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
