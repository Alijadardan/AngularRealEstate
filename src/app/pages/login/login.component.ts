import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Toast } from 'src/app/shared/helpers/Toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
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

  get form() {
    return this.loginForm.controls;
  }

}
