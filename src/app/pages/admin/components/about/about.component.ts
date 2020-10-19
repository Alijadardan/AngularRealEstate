import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AboutAdminService } from '../../../../services/admin/about-admin.service';
import { Component, OnInit } from '@angular/core';
import AboutUs from 'src/app/shared/models/AboutUs';
import { Toast } from 'src/app/shared/helpers/Toast';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'admin-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  about: AboutUs;
  aboutForm: FormGroup;
  isDirty = false;

  constructor(private aboutAdminService: AboutAdminService,
    private formBuilder: FormBuilder,
    private _location: Location) { }

  ngOnInit(): void {
    this.buildForm();
    this.getAboutUs();
    this.aboutForm.valueChanges.subscribe(e => this.isDirty = true);
  }

  onSubmit() {
    this.updateAboutUs(this.aboutForm.value);
  }

  updateAboutUs(data) {
    this.aboutAdminService.updateAboutUs(data).subscribe({
      next: (data) => {
        if (data.Message == "You didnt change anything.") {
          Toast.fire({
            icon: 'info',
            title: data.Message
          })
        } else {
          Toast.fire({
            icon: 'success',
            title: data.Message
          })
        }
        this.isDirty = false;
      }
    });
  }

  getAboutUs() {
    this.aboutAdminService.getAboutUs().subscribe((data) => {
      if (data && !(data.Message == "Not authorizated")) {
        this.about = data['About-Us'];
        console.log(this.about);
        this.aboutForm.patchValue({
          title: this.about.title,
          body: this.about.body
        });
        this.isDirty = false;
      } else {
        Swal.fire({
          text: 'Somthing went wrong :' + data.Message,
          icon: 'error'
        });
        this._location.back();
      }
    });
  }

  buildForm() {
    this.aboutForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  get form() {
    return this.aboutForm.controls;
  }

  canDeactivate() {
    return this.isDirty;
  }
}
