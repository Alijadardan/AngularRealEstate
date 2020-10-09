import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/shared/helpers/mustMatch.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private route: Router) { }

  ngOnInit(): void {
    this.buildForm();
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

  get form() {
    return this.registerForm.controls;
  }

}
