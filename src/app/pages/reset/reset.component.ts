import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  resetForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(){

  }


  buildForm(){
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get form() {
    return this.resetForm.controls;
  }


}
