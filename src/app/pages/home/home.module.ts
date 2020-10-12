import { ContactComponent } from './../../components/contact/contact.component';
import { MatSliderModule } from '@angular/material/slider';
import { AgentsComponent } from './../../components/agents/agents.component';
import { PopularPropertiesComponent } from './../../components/popular-properties/popular-properties.component';
import { PropertieCardComponent } from './../../shared/components/propertie-card/propertie-card.component';
import { FeaturedPropertiesComponent } from './../../components/featured-properties/featured-properties.component';
import { SearchFormComponent } from './../../components/search-form/search-form.component';
import { SliderComponent } from './../../components/slider/slider.component';
import { HomeLayoutComponent } from '../../components/home-layout/home-layout.component';
import { FooterComponent } from './../../shared/components/footer/footer.component';
import { NavbarComponent } from './../../shared/components/navbar/navbar.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { TopHeaderComponent } from 'src/app/shared/components/top-header/top-header.component';
import { AboutComponent } from 'src/app/components/about/about.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TopBarAdminComponent } from 'src/app/components/top-bar-admin/top-bar-admin.component';

@NgModule({
  declarations: [
    HomeComponent,
    TopHeaderComponent,
    NavbarComponent,
    FooterComponent,
    HomeLayoutComponent,
    ContactComponent,
    AboutComponent,
    SliderComponent,
    SearchFormComponent,
    FeaturedPropertiesComponent,
    PropertieCardComponent,
    PopularPropertiesComponent,
    AgentsComponent,
    TopBarAdminComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MatSliderModule
  ]
})
export class HomeModule { }
