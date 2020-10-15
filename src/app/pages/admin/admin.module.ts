import { SpinnerComponent } from './../../shared/components/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SingleContactComponent } from './components/single-contact/single-contact.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    ContactComponent,
    AboutComponent,
    SingleContactComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AdminModule { }
