import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userName;

  constructor() { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName')
  }

}
