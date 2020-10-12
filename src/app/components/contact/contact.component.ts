import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Toast } from 'src/app/shared/helpers/Toast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  isDirty = false;

  constructor(private formBuilder: FormBuilder,
    private contactService: ContactService) { }

  ngOnInit(): void {
    this.buildForm();
    this.contactForm.valueChanges.subscribe(e => this.isDirty = true);
  }

  onSubmit(){
    this.create(this.contactForm.value);
  }

  create(data){
    this.contactService.create(data).subscribe({
      next: () => {
          Toast.fire({
            icon: 'info',
            title: 'Send Successfully'
          })
      },
      error: error => {
        Swal.fire({
          text: 'Somthing went wrong :' + error,
          icon: 'error'
        });
      }
    });
  }

  buildForm(){
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  get form() {
    return this.contactForm.controls;
  }

  canDeactivate() {
    return this.isDirty;
  }

}
