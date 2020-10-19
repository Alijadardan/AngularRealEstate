import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Toast } from 'src/app/shared/helpers/Toast';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user;
  loggedIn: boolean;

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private route: Router,
    private socialauth: SocialAuthService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.socialauth.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      if(user){
        localStorage.setItem('userToken', user.idToken);
        localStorage.setItem('userName', user.name);
        this.route.navigate(['admin']);
        this.loggedIn = (user != null);
        this.auth.changeUser(this.user);
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login(this.loginForm.value);
    }
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(values) {
    this.auth.login(values).subscribe({
      next: (data) => {
        Toast.fire({
          icon: 'success',
          title: 'Login successfully'
        })
        localStorage.setItem('userToken', data.access_token);
        this.route.navigate(['/admin']);
      },
      error: error => {
        Swal.fire({
          text: 'Somthing went wrong',
          icon: 'error'
        });
      }
    });
  }

  signInWithGoogle(): void {
    this.socialauth.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.socialauth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  get form() {
    return this.loginForm.controls;
  }

}
