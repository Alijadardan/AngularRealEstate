import { ArticleAdminService } from './../../../../services/admin/article-admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Toast } from 'src/app/shared/helpers/Toast';

@Component({
  selector: 'app-add-edit-articles',
  templateUrl: './add-edit-articles.component.html',
  styleUrls: ['./add-edit-articles.component.scss']
})
export class AddEditArticlesComponent implements OnInit {

  addEditForm: FormGroup;
  isDirty = false;
  isAddMode: boolean;
  id: string;
  citys: string[] = ['Gjakove', 'Prishtine', 'Mitrovice', 'Peje', 'Prizren', 'Gjilan', 'Ferizaj'];
  for: string[] = ['both', 'sale', 'rent'];
  types: string[] = ['1+1', '2+1', '3+1', '3+2', '4+1', '4+2', '5+1'];
  availables: {id: number, name: string}[] = [
    { 'id': 0,  'name': "No" },
    { 'id': 1,  'name': "Yes" }
  ]

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private articleAdminService: ArticleAdminService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.buildForm();

    if (!this.isAddMode) {
      this.patchValues();
    }

    this.addEditForm.valueChanges.subscribe(e => this.isDirty = true);
  }

  onSubmit(){
    console.log(this.addEditForm.value);
    this.createArticle(this.addEditForm.value);
  }

  createArticle(data){
    this.articleAdminService.createArticle(data).subscribe({
      next: (data) => {
        Toast.fire({
          icon: 'success',
          title: data.message
        })
        this.addEditForm.reset();
      },
      error: error => {
        Swal.fire({
          text: 'Somthing went wrong :' + error,
          icon: 'error'
        });
      }
    });
  }

  buildForm() {
    this.addEditForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      price: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      for: ['', Validators.required],
      type: ['1+1', Validators.required],
      available: [1, Validators.required],
      phone_number: ['', Validators.required],
      filenames: ['', Validators.required]
    });
  }

  patchValues(){
    this.articleAdminService.getArticleById(this.id)
    .pipe(first())
    .subscribe((data) => {
      data = data['Article'];
      console.log(data);
      this.addEditForm.patchValue({
        title: data.title,
        body: data.body,
        price: data.price,
        address: data.address,
        city: data.city,
        for: data.for,
        type: data.type,
        available: data.available,
        phone_number: data.phonenumber,
        filenames: data.filenames
      });
      this.isDirty = false;
    });
  }

  get form() {
    return this.addEditForm.controls;
  }

  canDeactivate() {
    return this.isDirty;
  }
}