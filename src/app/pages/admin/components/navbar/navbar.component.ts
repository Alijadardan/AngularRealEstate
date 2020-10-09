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

  constructor(private route: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  logout(){
    this.auth.logout(localStorage.getItem('userToken')).subscribe({
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

  buildForm(){
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
    });
  }


}
