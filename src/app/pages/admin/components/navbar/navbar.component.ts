import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './../../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast } from 'src/app/shared/helpers/Toast';

@Component({
  selector: 'admin-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  searchForm: FormGroup;
  user;

  constructor(private route: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private socialauth: SocialAuthService,) { }

  ngOnInit(): void {
    this.buildForm();
    this.auth.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.auth.logout().subscribe({
      next: (data) => {
        Toast.fire({
          icon: 'success',
          title: data.message
        })
        localStorage.removeItem('userToken');
        this.route.navigate(['/']);
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

  buildForm() {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
    });
  }


}
