import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Toast } from 'src/app/shared/helpers/Toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar-admin',
  templateUrl: './top-bar-admin.component.html',
  styleUrls: ['./top-bar-admin.component.scss']
})
export class TopBarAdminComponent implements OnInit {

  constructor(private auth: AuthService,
    private route: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logout(localStorage.getItem('userToken')).subscribe({
      next: (data) => {
        Toast.fire({
          icon: 'success',
          title: data.message
        })
        localStorage.removeItem('userToken');
        location.reload();
      }
    });
  }
}
