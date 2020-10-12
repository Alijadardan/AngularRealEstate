import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLogin = false;

  constructor(private route: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('userToken')){
      this.isLogin = true;
      this.route.navigate(['/']);
    }
  }

}
