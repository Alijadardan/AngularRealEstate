import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { SliderComponent } from './components/slider/slider.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { FeaturedPropertiesComponent } from './components/featured-properties/featured-properties.component';
import { PropertieCardComponent } from './components/propertie-card/propertie-card.component';
import { PopularPropertiesComponent } from './components/popular-properties/popular-properties.component';
import { AgentsComponent } from './components/agents/agents.component';
import { FooterComponent } from './components/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    TopHeaderComponent,
    NavbarComponent,
    HomeComponent,
    SliderComponent,
    SearchFormComponent,
    FeaturedPropertiesComponent,
    PropertieCardComponent,
    PopularPropertiesComponent,
    AgentsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
