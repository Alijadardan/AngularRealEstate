import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AboutService } from './../../../../services/admin/about.service';
import { Component, OnInit } from '@angular/core';
import AboutUs from 'src/app/shared/models/AboutUs';
import { Toast } from 'src/app/shared/helpers/Toast';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  about: AboutUs;
  aboutForm: FormGroup;
  isDirty = false;

  constructor(private aboutservice: AboutService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
    this.getAboutUs();
    this.aboutForm.valueChanges.subscribe(e => this.isDirty = true);
  }

  onSubmit(){
    this.updateAboutUs(this.aboutForm.value);
  }

  updateAboutUs(data){
    this.aboutservice.updateAboutUs(data).subscribe({
      next: (data) => {
        if(data.Message == "You didnt change anything."){
          Toast.fire({
            icon: 'info',
            title: data.Message
          })
        }else {
          Toast.fire({
            icon: 'success',
            title: data.Message
          })
        }

      }
    });
  }

  getAboutUs(){
    this.aboutservice.getAboutUs().subscribe((data)=>{
      this.about = data['About-Us'];
      this.aboutForm.patchValue({
        title: this.about.title,
        body: this.about.body
      });
      this.isDirty = false;
    });
  }

  buildForm(){
    this.aboutForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  canDeactivate() {
    return this.isDirty;
  }
}
