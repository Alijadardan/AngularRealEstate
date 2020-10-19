import { SocialAuthService, SocialUser } from 'angularx-social-login';
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

  user;

  constructor(private auth: AuthService,
    private route: Router,
    private socialauth: SocialAuthService) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  logout(){
    this.auth.logout().subscribe({
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

  signOut(): void {
    if (this.user instanceof SocialUser) {
      this.socialauth.signOut();
      localStorage.clear();
      this.route.navigate(['/']);
    } else {
      this.logout();
    }
  }

}
