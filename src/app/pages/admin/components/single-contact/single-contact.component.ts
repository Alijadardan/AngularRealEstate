import { ContactAdminService } from './../../../../services/admin/contact-admin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import SingleContact from 'src/app/shared/models/SingleContact';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-single-contact',
  templateUrl: './single-contact.component.html',
  styleUrls: ['./single-contact.component.scss']
})
export class SingleContactComponent implements OnInit {

  id: number;
  contact: SingleContact;

  constructor(private contactService: ContactAdminService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.getContactById();
  }


  getContactById(){
    this.contactService.getContactById(this.id).subscribe({
      next: (data) => {
        console.log(data['Contact']);
        this.contact = data['Contact'];
      },
      error: error => {
        Swal.fire({
          text: 'Somthing went wrong :' + error,
          icon: 'error'
        });
      }
    });
  }

}
