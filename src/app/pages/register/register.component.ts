import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/shared/helpers/mustMatch.validator';
import Swal from 'sweetalert2';

import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user: SocialUser;
  loggedIn: boolean;

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private socialauth: SocialAuthService,
    private route: Router) { }

  ngOnInit(): void {
    this.buildForm();
    this.socialauth.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      localStorage.setItem('userToken', user.idToken);
      localStorage.setItem('userName', user.name);
      this.route.navigate(['admin']);
      this.loggedIn = (user != null);
    });
  }

  onSubmit(){
    if (this.registerForm.valid) {
      this.auth.register(this.registerForm.value).subscribe({
        next: () => {
          Swal.fire({
            text: 'User Created Successfully',
            icon: 'success'
          });
          this.route.navigate(['/login']);
        },
        error: () => {
          Swal.fire({
            text: 'Somthing went wrong',
            icon: 'error'
          });
        }
      });
    }
  }

  buildForm(){
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'password_confirmation')
    });
  }

  signInWithGoogle(): void {
    this.socialauth.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.socialauth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  get form() {
    return this.registerForm.controls;
  }

}
