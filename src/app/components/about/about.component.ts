import { AboutService } from './../../services/about.service';
import { Component, OnInit } from '@angular/core';
import AboutUs from 'src/app/shared/models/AboutUs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  aboutus: AboutUs;
  isLoading = true;

  constructor(private aboutService: AboutService) { }

  ngOnInit(): void {
    this.getAboutUs();
  }

  getAboutUs(){
    this.aboutService.getAboutUs().subscribe((data)=>{
      this.aboutus = data['About us'];
      this.isLoading = false;
    });
  }

}
